import { Component } from '@angular/core';
import { NavController, AlertController,  ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RecipesService } from '../../providers/recipes-service';
import { RecipeDetailPage } from '../recipe-detail/recipe-detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    recipe: any;
    recipesList: any;
    countLike: number = 0;
    constructor(private afAuth: AngularFireAuth, private toast: ToastController, private recipesService: RecipesService, public navCtrl: NavController, private alertCtrl: AlertController) {
        this.getRecipes();
    }
    
    ionViewWillLoad() {
        this.afAuth.authState.subscribe(data => {
            if(data && data.email && data.uid) {
                this.toast.create({
                    message: 'Welcome to Eating Healthy ' + data.email,
                    duration: 3000
                }).present();
            }
            else {
                this.toast.create({
                    message: 'Could not find authentication details', 
                    duration: 3000
                }).present();
            
            }
        });
    }
    
    logout(): any {
       
       this.afAuth.auth.signOut();
        console.log("hhhhh")
     
    }

    getRecipes() {
        console.log(this);
        this.recipesService.getRecipes().subscribe(data => this.recipesList = data);
    }
    
    launchRecipeDetailPage(recipe) {
       console.log(this);
       console.log("----------");
        
       this.navCtrl.push(RecipeDetailPage, {
            "recipe": recipe       
       });
      
    }
        
    getLike(recipe) {
        console.log(this);
        recipe.likeNumber += 1;
        this.recipesService.postRecipesLike(recipe).subscribe(data => {
            recipe = data;
            console.log(recipe);
        });  
    
    }
    
    openAlert() {
        this.alertCtrl.create({
            title: 'Please click button "More", thanks.',
            buttons: [{text: 'Dimiss'}]
        }).present();
        
    }
}
