export function initFilter(allRecipes, displayRecipes) {
    const ingredientItems = document.querySelectorAll(".ingredients-list p");
    const applianceItems = document.querySelectorAll(".appliance-list p");
    const ustensilItems = document.querySelectorAll(".ustensils-list p");

    function applyFilter(selected) {
        const filtered = allRecipes.filter(recipe => {
            const inName = recipe.name.toLowerCase().includes(selected);
            const inDesc = recipe.description.toLowerCase().includes(selected);
            const inIngredients = recipe.ingredients.some(ing =>
                ing.ingredient.toLowerCase().includes(selected)
            );
            const inAppliance = recipe.appliance.toLowerCase().includes(selected);
            const inUstensils = recipe.ustensils.some(u =>
                u.toLowerCase().includes(selected)
            );
            return inName || inDesc || inIngredients || inAppliance || inUstensils;
        });

        displayRecipes(filtered);
    }

    [...ingredientItems, ...applianceItems, ...ustensilItems].forEach(item => {
        item.classList.add("cursor-pointer"); // au cas où
        item.addEventListener("click", () => {
            const selected = item.textContent.toLowerCase();
            applyFilter(selected);
        });
    });
}