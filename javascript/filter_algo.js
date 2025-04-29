import { filterRecipes, updateDropdowns, filteredRecipesBySearch } from "./search_algo.js"; // Importez filterRecipes et updateDropdowns

export const activeFilters = [];

export const initFilter = (allRecipes, displayRecipes) => {
    const ingredientItems = document.querySelectorAll(".ingredients-list p");
    const applianceItems = document.querySelectorAll(".appliance-list p");
    const ustensilItems = document.querySelectorAll(".ustensils-list p");

    [...ingredientItems, ...applianceItems, ...ustensilItems].forEach(item => {
        item.classList.add("cursor-pointer");

        item.addEventListener("click", () => {
            const selected = item.textContent.toLowerCase();

            if (!activeFilters.includes(selected)) {
                activeFilters.push(selected);
                createFilterTag(item.textContent, displayRecipes, allRecipes);
                applyFilter(displayRecipes, allRecipes);

                item.classList.remove("pl-2.5", "pr-2.5");
                item.classList.add("bg-[#FFD15B]", "font-bold", "px-2", "py-2", "flex", "justify-between", "items-center", "filter-selected");

                if (!item.querySelector(".remove-icon")) {
                    const icon = document.createElement("i");
                    icon.className = "fa-solid fa-circle-xmark text-[15px] ml-2 remove-icon cursor-pointer";
                    icon.addEventListener("click", e => {
                        e.stopPropagation();
                        const index = activeFilters.indexOf(selected);
                        if (index !== -1) activeFilters.splice(index, 1);

                        item.classList.remove("bg-[#FFD15B]", "font-bold", "px-2", "py-2", "flex", "justify-between", "items-center", "filter-selected");
                        icon.remove();
                        item.classList.add("pl-2.5", "pr-2.5");

                        const tags = document.querySelectorAll(".filter-tag span");
                        tags.forEach(tag => {
                            if (tag.textContent.toLowerCase() === selected) {
                                tag.parentElement.remove();
                            }
                        });

                        applyFilter(displayRecipes, allRecipes);
                    });

                    item.appendChild(icon);
                }
            }
        });

        const originalText = item.textContent.trim();
        item.textContent = originalText.charAt(0).toUpperCase() + originalText.slice(1);
    });
};

export const applyFilter = (displayRecipes, allRecipes, searchTerm = "") => {
    // 🔥 Si l'utilisateur a cherché, on filtre sur filteredRecipesBySearch
    let baseRecipes = filteredRecipesBySearch.length > 0 ? filteredRecipesBySearch : allRecipes;

    let filteredRecipes = baseRecipes;

    // Appliquer le filtre principal si un terme de recherche est présent
    if (searchTerm) {
        filteredRecipes = filterRecipes(searchTerm, filteredRecipes);
    }

    // Appliquer les filtres tags
    filteredRecipes = filteredRecipes.filter(recipe =>
        activeFilters.every(filter => {
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
        })
    );

    displayRecipes(filteredRecipes);
    updateDropdowns(filteredRecipes); // MAJ dropdown
};

export const createFilterTag = (filterName, displayRecipes, allRecipes) => {
    const filtersContainer = document.querySelector(".active-filters");

    const tag = document.createElement("div");
    tag.className = "filter-tag bg-[#FFD15B] text-[14px] px-4 py-4 rounded-[10px] flex items-center gap-2";

    tag.innerHTML = `
    <span>${filterName}</span>
    <button class="remove-tag cursor-pointer">
        <i class="fa-solid fa-xmark text-[12px]"></i>
    </button>`;

    tag.querySelector(".remove-tag").addEventListener("click", () => {
        const index = activeFilters.indexOf(filterName.toLowerCase());
        if (index !== -1) activeFilters.splice(index, 1);

        tag.remove();

        const allItems = document.querySelectorAll(".ingredients-list p, .appliance-list p, .ustensils-list p");
        allItems.forEach(item => {
            if (item.textContent.toLowerCase() === filterName.toLowerCase()) {
                item.classList.remove("bg-[#FFD15B]", "font-bold", "px-2", "py-2", "flex", "justify-between", "items-center", "filter-selected");
                item.classList.add("pl-2.5", "pr-2.5");

                const icon = item.querySelector(".remove-icon");
                if (icon) icon.remove();
            }
        });

        applyFilter(displayRecipes, allRecipes);
    });

    filtersContainer.appendChild(tag);
};



