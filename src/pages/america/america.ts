import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecipesService } from '../../providers/recipes-service';
import { RecipeDetailPage } from '../recipe-detail/recipe-detail';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-america',
  templateUrl: 'america.html'
})
export class AmericaPage {
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
            if (item.area == "America") {
                return true;
            }
            return false;
        });
    }
    
    launchRecipeDetailPage(recipe) {
       
       this.navCtrl.push(RecipeDetailPage, {
       
            "recipe": recipe
       
       });       
      
    }
}
