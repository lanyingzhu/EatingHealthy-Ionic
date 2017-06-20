import { Component } from '@angular/core';
import { RecipesService } from '../../providers/recipes-service';
import { NavController } from 'ionic-angular';
import { RecipeDetialPage } from '../recipe-detial/recipe-detial';


/**
 * Generated class for the Europe page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-europe',
  templateUrl: 'europe.html',
})
export class EuropePage {

    recipesList = [];
    
  
    constructor(private recipesService: RecipesService, public navCtrl: NavController) {
        this.getRecipes();
        this.filterData(this.recipesList);
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
            if (item.area == "Europe") {
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
