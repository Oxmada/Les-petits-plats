import {initDropdowns} from "./dropdowns-button.js";
import {initClearInput} from "./cross-clear-input.js";
import {recipeTemplate} from "./recipe-template.js";
import {recipes} from "../recipes.js";
import {displayRecipes} from "./display.js";
import {initFilter} from "./filter_algo.js";
import {initAllDropdownSearch} from "./algo_filter_search.js";
import {initSearchInput, filteredRecipesBySearch} from "./search_algo.js";
import {updateRecipeCount} from "./recipe_counter.js";


initDropdowns();
initClearInput();

// Initialise l'affichage et le compteur des recettes
displayRecipes(recipes);
updateRecipeCount(recipes);

const searchButton = document.querySelector(".search-button");
const mainInput = document.getElementById("main-search");


initSearchInput("main-search", searchButton, recipes, displayRecipes);

// Gère l'affichage dynamique des filtres
const displayFiltersInfo = (recipes) => {
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

    const recipesToFilter = filteredRecipesBySearch.length > 0 ? filteredRecipesBySearch : recipes;
    initFilter(recipesToFilter, displayRecipes);
};

// Affiche les filtres au chargement initial
displayFiltersInfo(recipes);

// Initialise les recherches dans les dropdowns
initAllDropdownSearch()







