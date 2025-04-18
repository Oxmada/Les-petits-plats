import {initDropdowns} from "./dropdowns-button.js";
import {initClearInput} from './cross-clear-input.js';
import {recipeTemplate} from "./recipe-template.js";
import {recipes} from "../recipes.js"

initDropdowns();
initClearInput();

const container = document.querySelector(".container-recipes-cards");

recipes.forEach(recipe => {
    const template = recipeTemplate(recipe);
    const card = template.getRecipeCardDom();
    container.appendChild(card);
});





