import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { RecipesService } from '../../providers/recipes-service';

@Component({
  selector: 'page-recipe-detial',
  templateUrl: 'recipe-detial.html',
})
export class RecipeDetialPage {

  recipe: any;
  direction: any;
  ingredient: any;

  user: any;
  userToken: any;
  
 
  showForm: boolean = false;
  submitAttempt: boolean = false;
  private myComment: FormGroup ;
  //private myData: any;
  
  constructor(private afAuth: AngularFireAuth, private recipesService: RecipesService, public navCtrl: NavController, private builder: FormBuilder,  public navParams: NavParams, private alertCtrl: AlertController) {
    
    console.log(this);
    this.recipe = this.navParams.get('recipe');
    this.direction = this.recipe.direction.split(';');
    this.ingredient = this.recipe.ingredient.split(';');
    console.log(this.recipe.comments);
    
    
    
    this.myComment = builder.group({
        "comment": ['', Validators.minLength(10)],
        "author": ['', Validators.minLength(3)]
    });  
    
  }
  
  ionViewWillLoad() {
        
        this.afAuth.authState.subscribe(data => {
           console.log(data);
           if (data) {
               this.user = data;
               console.log(this.user.email);
            } else {
                console.log("No user");
            }
        });
        
        this.afAuth.idToken.subscribe(data => {
            if(data) {
                console.log(data);
                data.getIdToken().then(token => {
                    this.userToken = token;
                    console.log(this.userToken);                
                });
            }
            else {
                console.log("No user");
            }
        });
    }
  
  
  getLike() {
    this.recipe.likeNumber += 1;
    console.log(this);
    this.recipesService.postRecipesLike(this.recipe).subscribe(data => {
            this.recipe = data;
            console.log(this.recipe);
    });
  }
  
  openForm() { 
  
    if(this.user) {
         this.showForm = !this.showForm;
    }
    else {
        this.alertCtrl.create({
            title: 'Please login, thanks.',
            buttons: [{text: 'Dimiss'}]
        }).present();
    }


  }
  
  submitComment() {
   
    console.log(this.myComment.value);
    this.recipe.comments.push(this.myComment.value);
    console.log(this.recipe);
    this.recipesService.postComments(this.recipe._id, this.myComment.value, this.userToken).subscribe(data => {
            this.recipe = data;
            console.log(this.recipe);
    });
    this.submitAttempt = true;
    this.showForm = false;
  
  }
}

