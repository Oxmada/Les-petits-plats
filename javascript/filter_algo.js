const activeFilters = [];

export function initFilter(allRecipes, displayRecipes) {
    const ingredientItems = document.querySelectorAll(".ingredients-list p");
    const applianceItems = document.querySelectorAll(".appliance-list p");
    const ustensilItems = document.querySelectorAll(".ustensils-list p");

    function applyFilter(displayRecipes, allRecipes) {
        const filtered = allRecipes.filter(recipe => {
            return activeFilters.every(filter => {
                const inName = recipe.name.toLowerCase().includes(filter);
                const inDesc = recipe.description.toLowerCase().includes(filter);
                const inIngredients = recipe.ingredients.some(ing =>
                    ing.ingredient.toLowerCase().includes(filter)
                );
                const inAppliance = recipe.appliance.toLowerCase().includes(filter);
                const inUstensils = recipe.ustensils.some(u =>
                    u.toLowerCase().includes(filter)
                );
                return inName || inDesc || inIngredients || inAppliance || inUstensils;
            });
        });
    
        displayRecipes(filtered);
    }

    [...ingredientItems, ...applianceItems, ...ustensilItems].forEach(item => {
        item.classList.add("cursor-pointer");
        item.addEventListener("click", () => {
            const selected = item.textContent.toLowerCase();
            if (!activeFilters.includes(selected)) {
                activeFilters.push(selected);
                applyFilter(displayRecipes, allRecipes);
            }
        });
    });
}