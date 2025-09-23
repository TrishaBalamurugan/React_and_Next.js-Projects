import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule]
})
export class AppComponent {
  title = 'Trisha Balamurugan\'s Recipe Cookbook';

  recipes: any[] = [];

  // Form bindings
  newRecipeName = '';
  newRecipeIngredients = '';
  newRecipeInstructions = '';
  newRecipeImage: string | ArrayBuffer | null = null;
  filterText = '';

  constructor() {
    this.loadRecipes();
  }

  // Handle image file selection safely for TypeScript
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Type-safe assignment: fallback to null if undefined
        this.newRecipeImage = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  // Add a new recipe
  addRecipe() {
    if (!this.newRecipeName || !this.newRecipeIngredients || !this.newRecipeInstructions) return;

    const newId = Date.now();
    const ingredientsArray = this.newRecipeIngredients.split(',').map((ingredient: string) => ingredient.trim());
    this.recipes.push({
      id: newId,
      name: this.newRecipeName,
      ingredients: ingredientsArray,
      instructions: this.newRecipeInstructions,
      showInstructions: false,
      favorite: false,
      image: this.newRecipeImage || null
    });

    this.saveRecipes();

    // Clear form
    this.newRecipeName = '';
    this.newRecipeIngredients = '';
    this.newRecipeInstructions = '';
    this.newRecipeImage = null;

    // Reset file input
    const inputFile: any = document.getElementById('recipeImage');
    if (inputFile) inputFile.value = '';
  }

  // Toggle instructions visibility
  toggleInstructions(recipe: any) {
    recipe.showInstructions = !recipe.showInstructions;
  }

  // Delete a recipe by ID
  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.saveRecipes();
  }

  // Toggle favorite
  toggleFavorite(recipe: any) {
    recipe.favorite = !recipe.favorite;
    this.saveRecipes();
  }

  // Filtered and sorted recipes
  get filteredRecipes() {
    return this.recipes
      .filter(r =>
        r.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
        r.ingredients.some((ingredient: string) =>
          ingredient.toLowerCase().includes(this.filterText.toLowerCase())
        )
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // Local Storage
  saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  loadRecipes() {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      this.recipes = JSON.parse(saved);
    } else {
      // Default recipes
      this.recipes = [
        {
          id: Date.now() + 1,
          name: 'Spaghetti Carbonara',
          ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black Pepper'],
          instructions: 'Boil pasta. Cook pancetta. Mix eggs and cheese. Combine all with pasta.',
          showInstructions: false,
          favorite: false,
          image: null
        },
        {
          id: Date.now() + 2,
          name: 'Chocolate Chip Cookies',
          ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Chocolate Chips'],
          instructions: 'Mix ingredients. Bake at 350°F for 12 minutes.',
          showInstructions: false,
          favorite: false,
          image: null
        },
        {
          id: Date.now() + 3,
          name: 'Avocado Toast',
          ingredients: ['Bread', 'Avocado', 'Salt', 'Pepper', 'Lemon Juice'],
          instructions: 'Toast bread. Mash avocado with salt, pepper, and lemon. Spread on toast.',
          showInstructions: false,
          favorite: false,
          image: null
        }
      ];
      this.saveRecipes();
    }
  }
}

