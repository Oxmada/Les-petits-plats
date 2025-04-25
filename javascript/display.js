import {recipeTemplate} from "./recipe-template.js";

export const displayRecipes = (recipes) => {
    const container = document.querySelector(".container-recipes-cards");
    container.innerHTML = "";

    recipes.forEach(recipe => {
        const template = recipeTemplate(recipe);
        const card = template.getRecipeCardDom();
        container.appendChild(card);
    });
};