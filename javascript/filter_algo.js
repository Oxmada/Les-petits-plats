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
                createFilterTag(selected, displayRecipes, allRecipes);
                applyFilter(displayRecipes, allRecipes);
            }
        });
    });
}

function createFilterTag(filterName, displayRecipes, allRecipes) {
    const filtersContainer = document.querySelector(".active-filters");

    const tag = document.createElement("div");
    tag.className = "filter-tag bg-yellow-400 text-black px-3 py-1 rounded flex items-center gap-2";

    tag.innerHTML = `
    <span>${filterName}</span>
    <button class="remove-tag text-black font-bold cursor-pointer">&times;</button>`;

    tag.querySelector(".remove-tag").addEventListener("click", () => {
        const index = activeFilters.indexOf(filterName);
        if (index !== -1) activeFilters.splice(index, 1);

        tag.remove();

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
    });

    filtersContainer.appendChild(tag);
    
}