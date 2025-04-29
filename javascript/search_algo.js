// Variable pour stocker la nouvelle liste
export let filteredRecipesBySearch = [];

export const updateFilteredRecipes = (newList) => {
    filteredRecipesBySearch = newList;
};

export const initSearchInput = (inputId, searchButton, recipes, displayRecipes) => {
    const mainInput = document.getElementById(inputId);
    const crossIcon = document.querySelector(".cross-search-input");

    const handleSearch = () => {
        const searchTerm = mainInput.value.toLowerCase().trim();
        
        if (searchTerm.length < 3) return; // Ne lance rien si moins de 3 caractères
        
        const filteredRecipes = filterRecipes(searchTerm, recipes);
        displayRecipes(filteredRecipes);
        updateFilteredRecipes(filteredRecipes); // Stocke la nouvelle liste

        // Mets à jour les listes déroulantes avec les recettes restantes
        updateDropdowns(filteredRecipes);
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
        displayRecipes(recipes);
        updateFilteredRecipes(recipes); // Remet la liste complète
        updateCrossVisibility();
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
        displayRecipes(recipes);
        updateDropdowns(recipes);
        updateFilteredRecipes([]);
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

export const updateDropdowns = (filteredRecipes) => {
    const dropdowns = document.querySelectorAll(".search-dropdown-input");
    dropdowns.forEach(input => {
        const list = input.closest(".dropdown-content").querySelector(".ingredients-list, .appliance-list, .ustensils-list");
        if (!list) return;
  
        const keyword = input.value.toLowerCase().trim();
  
        list.querySelectorAll("p").forEach(item => {
            const text = item.textContent.toLowerCase();
            const match = text.includes(keyword);
  
            const isInRecipes = filteredRecipes.some(recipe => {
                if (list.classList.contains("ingredients-list")) {
                    return recipe.ingredients.some(ingredientObj => ingredientObj.ingredient.toLowerCase() === text);
                } else if (list.classList.contains("appliance-list")) {
                    return recipe.appliance.toLowerCase() === text;
                } else if (list.classList.contains("ustensils-list")) {
                    return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === text);
                }
                return false;
            });
  
            item.style.display = match && isInRecipes ? "flex" : "none";
        });
    });
};
