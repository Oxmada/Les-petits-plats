export const updateRecipeCount = (recipes) => {
    const counter = document.getElementById("recipe-count");

    // Affiche le nombre de recette et rajoute un s à recette si plusieurs recettes
    counter.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ''}`;

    counter.style.fontFamily = 'Anton, sans-serif';
    counter.style.fontWeight = 'normal';
    counter.style.fontSize = '21px';
};
