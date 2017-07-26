import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecipesService } from '../../providers/recipes-service';
import { RecipeDetialPage } from '../recipe-detial/recipe-detial';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the Asian page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-asian',
  templateUrl: 'asian.html',
})
export class AsianPage {
    recipesList: any;
  
    constructor(private recipesService: RecipesService, public navCtrl: NavController) {
        this.getRecipes();
    }

    getRecipes() {
        this.recipesService.getRecipes().subscribe(data => {
            this.recipesList = data;
            this.recipesList = this.filterData(this.recipesList);
        });
        
    }
    
    getLike(recipe) {
        console.log(recipe);
        recipe.likeNumber += 1;
        this.recipesService.postRecipesLike(recipe).subscribe(data => {
                recipe = data;
                console.log(recipe);
        });  
    
    
  }

    filterData(data) {
        return data.filter((item) => {
            if (item.area == "Asianfood") {
                return true;
            }
            return false;
        });
    }
    
    launchRecipeDetialPage(recipe) {
       
       this.navCtrl.push(RecipeDetialPage, {
       
             "recipe": recipe
       });
        
    }
}
