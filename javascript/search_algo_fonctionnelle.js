export function initSearchInput(inputId, searchButton, recipes, displayRecipes) {
    const mainInput = document.getElementById(inputId);

    const handleSearch = () => {
        const searchTerm = mainInput.value.toLowerCase().trim();
        const filteredRecipes = filterRecipes(searchTerm, recipes);
        displayRecipes(filteredRecipes);
    };

    searchButton.addEventListener("click", handleSearch);

    mainInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
}

function filterRecipes(searchTerm, recipes) {
    return recipes.filter(recipe => {
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();

        const foundInIngredients = recipe.ingredients.some(ingredientObj =>
            ingredientObj.ingredient.toLowerCase().includes(searchTerm)
        );

        return name.includes(searchTerm) || description.includes(searchTerm) || foundInIngredients;
    });
}