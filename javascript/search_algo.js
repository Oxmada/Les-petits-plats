export function initSearchInput(inputId, searchButton, recipes, displayRecipes) {
    const mainInput = document.getElementById(inputId);
    // const searchButton = document.querySelector(".search-button");

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
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();

        let foundInIngredients = false;
        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
            if (ingredient.includes(searchTerm)) {
                foundInIngredients = true;
                break;
            }
        }

        if (name.includes(searchTerm) || description.includes(searchTerm) || foundInIngredients) {
            filteredRecipes.push(recipe);
        }
    }

    return filteredRecipes;
}

