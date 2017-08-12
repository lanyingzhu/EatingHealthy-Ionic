import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RecipesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecipesService {
  
  private url: string = "https://eatinghealthyrest-akin-gamb.mybluemix.net/recipes";
  //private url: string = "/recipes";

  constructor(private http: Http) {
    console.log('Hello RecipesService Provider');
  }
  
  getRecipes() {
    let headers = new Headers({"Access-Control-Allow-Origin": "*"});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url)
    .do (this.logResponse)
    .map (this.extractData)
    .catch(this.catchError)
  }
  
  postRecipesLike(recipe) {
    return this.http.put(this.url + "/" + recipe._id, {"likeNumber": recipe.likeNumber})
    .do (this.logResponse)
    .map (this.extractData)
    .catch(this.catchError)
  }
  
  postComments(id, comment, token) {
    comment.token = token;
    return this.http.post(this.url + "/" + id + "/comments", comment)
    .do (this.logResponse)
    .map (this.extractData)
    .catch(this.catchError)
  }
  
  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json || "server error.");
  }
  
  private logResponse(res: Response) {
    console.log(res);
  }
  
  private extractData(res:Response) {
    var objs = res.json().rows;
    if (objs) {
        var recipes = new Array();
        for (var i=0; i<objs.length; i++) {
            objs[i].doc.commentNumber = objs[i].doc.comments.length;
            recipes.push(objs[i].doc);
        };
        return recipes;
    }
    return res.json();
  }
}
