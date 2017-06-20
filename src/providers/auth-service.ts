import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  name: string;
  password: string;
  //email: string;
 
  constructor(name: string,password: string, email: string) {
    this.name = name;
    this.password = password;
    //this.email = email;
  }
}

@Injectable()
export class AuthService {
   baseUrl:string = 'http://localhost:3000/users/';

   constructor(public http: Http) {
        console.log('Hello AuthService Provider');
   }
   
   createAuthorizationHeader(headers: Headers) {
   
        headers.append('Authorization', window.localStorage.getItem('token'));
   }
   
   private() {
   
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(this.baseUrl+'private', {
            headers: headers
        }).map(res => res.json());
   }
    
   
   login(data) {
   
        return this.http.post(this.baseUrl+'login', data)
        .map(this.extractData);
   }
   
   isLogged() {
        if(window.localStorage.getItem('token')) {
            return true
        }else{
            return false;
        }
   }
   
   logout() {
   
        window.localStorage.removeItem('token');
        return true;
   }
   
   private extractData(res: Response) {
   
        let body = res.json();
        if(body.succes === true) {
            window.localStorage.setItem('token', body.token);
        };
        
        return body || {};
        
   }
   
}
  
  