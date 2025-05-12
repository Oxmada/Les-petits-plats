import {updateDropdowns} from "./updateDropdowns.js";
import {applyFilter} from "./filter_algo.js";

// Variable pour stocker la nouvelle liste
export let filteredRecipesBySearch = [];

export const updateFilteredRecipes = (newList) => {
    filteredRecipesBySearch = newList;
};

export const initSearchInput = (inputId, searchButton, recipes, displayRecipes) => {
    const mainInput = document.getElementById(inputId);
    const crossIcon = document.querySelector(".cross-search-input");
    const errorMessage = document.querySelector(".no-results");


    const handleSearch = () => {
        const searchTerm = mainInput.value.toLowerCase().trim();
        if (searchTerm.length < 3) return;

        const filteredRecipes = filterRecipes(searchTerm, recipes);

        // Stock la nouvelle liste (avant d’appliquer les filtres)
        updateFilteredRecipes(filteredRecipes);

        // Applique les filtres tags SUR le résultat de la recherche
        applyFilter(displayRecipes, recipes, searchTerm); // <-- modifié ici

        updateDropdowns(filteredRecipes);

        if (filteredRecipes.length === 0) {
            errorMessage.innerHTML = `
                <div class="no-results">
                    <p>Aucune recette ne contient "${searchTerm}"</p>
                    <p>Essayez des termes comme "poisson", "tarte aux pommes", etc.</p>
                </div>`;
            errorMessage.style.display = "block";
        } else {
        errorMessage.style.display = "none";
        }
    };

    const updateCrossVisibility = () => {
        if (mainInput.value.trim()) {
            crossIcon.style.display = "block";
        } else {
            crossIcon.style.display = "none";
        }
    };

    const resetSearch = () => {
        mainInput.value = "";

        // Vide la recherche
        updateFilteredRecipes([]);
        updateCrossVisibility();

        // Réapplique les filtres tags
        applyFilter(displayRecipes, recipes, ""); 
    };


    searchButton.addEventListener("click", handleSearch);

    mainInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    mainInput.addEventListener("input", () => {
        updateCrossVisibility();

        const searchTerm = mainInput.value.toLowerCase().trim();

        if (searchTerm.length >= 3) {
            handleSearch();
        } else if (searchTerm.length === 0) {
            updateFilteredRecipes([]); // vide la recherche
            applyFilter(displayRecipes, recipes, ""); // 🔥 passe un searchTerm vide
        }
    });


    mainInput.addEventListener("input", updateCrossVisibility);
    crossIcon.addEventListener("click", resetSearch);

    // Cache initialement la croix
    updateCrossVisibility();
};

export const filterRecipes = (searchTerm, recipes) => {
    return recipes.filter(recipe => {
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();

        const foundInIngredients = recipe.ingredients.some(ingredientObj =>
            ingredientObj.ingredient.toLowerCase().includes(searchTerm)
        );

        return name.includes(searchTerm) || description.includes(searchTerm) || foundInIngredients;
    });
}
