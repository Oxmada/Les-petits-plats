import {initDropdowns} from "./dropdowns-button.js";
import {initClearInput} from "./cross-clear-input.js";
import {recipeTemplate} from "./recipe-template.js";
import {recipes} from "../recipes.js";
import {initSearchInput} from "./search_algo.js";
import {initFilter} from "./filter_algo.js";


initDropdowns();
initClearInput();

const container = document.querySelector(".container-recipes-cards");


displayRecipes(recipes);
displayFiltersInfo(recipes);


function displayRecipes(recipes) {
    container.innerHTML = "";

    recipes.forEach(recipe => {
        const template = recipeTemplate(recipe);
        const card = template.getRecipeCardDom();
        container.appendChild(card);
    });
}

const searchButton = document.querySelector(".search-button");
initSearchInput("main-search", searchButton, recipes, displayRecipes);

function displayFiltersInfo(recipes) {
    const ingredientsList = document.querySelector(".ingredients-list");
    const applianceList = document.querySelector(".appliance-list");
    const ustensilsList = document.querySelector(".ustensils-list");

    ingredientsList.innerHTML = "";
    applianceList.innerHTML = "";
    ustensilsList.innerHTML = "";

    recipes.forEach(recipe => {
        const template = recipeTemplate(recipe);
        template.getFiltersInfoDom();
    });

    initFilter(recipes, displayRecipes);
}





