const activeFilters = [];

export function initFilter(allRecipes, displayRecipes) {
    const ingredientItems = document.querySelectorAll(".ingredients-list p");
    const applianceItems = document.querySelectorAll(".appliance-list p");
    const ustensilItems = document.querySelectorAll(".ustensils-list p");

    // Ajoute l'événement "click" sur chaque élément de la liste de filtres
    [...ingredientItems, ...applianceItems, ...ustensilItems].forEach(item => {
        item.classList.add("cursor-pointer");

        item.addEventListener("click", () => {
            const selected = item.textContent.toLowerCase(); 

            if (!activeFilters.includes(selected)) {
                activeFilters.push(selected); 
                createFilterTag(item.textContent, displayRecipes, allRecipes); 
                applyFilter(displayRecipes, allRecipes); 

                // Supprime le padding de base
                const parentWithPadding = item.closest(".dropdown-content");
                parentWithPadding.classList.remove("p-2.5");
                // Ajoute le style sélectionné + croix
                item.classList.add("bg-[#FFD15B]", "font-bold", "px-2", "py-2", "flex", "justify-between", "items-center", "filter-selected");
                
                if (!item.querySelector(".remove-icon")) {
                    const icon = document.createElement("i");
                    icon.className = "fa-solid fa-circle-xmark text-[15px] ml-2 remove-icon cursor-pointer";
                    icon.addEventListener("click", (e) => {
                        e.stopPropagation();

                        // Supprime du tableau
                        const index = activeFilters.indexOf(selected);
                        if (index !== -1) activeFilters.splice(index, 1);

                        // Supprime style + icône
                        item.classList.remove("bg-[#FFD15B]", "font-bold", "px-2", "py-2", "flex", "justify-between", "items-center", "filter-selected");
                        icon.remove();

                        // Supprime le padding de base
                        const parent = item.closest(".dropdown-content");
                        parent.classList.add("p-2.5");

                        removeTagFromUI(selected);
                        applyFilter(displayRecipes, allRecipes);
                    });

                    item.appendChild(icon);
                }
            }
            
        });

        // Met la première lettre en majuscule pour l'affichage
        const originalText = item.textContent.trim();
        item.textContent = originalText.charAt(0).toUpperCase() + originalText.slice(1);
    });
}


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


function createFilterTag(filterName, displayRecipes, allRecipes) {
    const filtersContainer = document.querySelector(".active-filters");

    const tag = document.createElement("div");
    tag.className = "filter-tag bg-[#FFD15B] text-[14px] px-4 py-4 rounded-[10px] flex items-center gap-2";

    tag.innerHTML = `
    <span>${filterName}</span>
    <button class="remove-tag cursor-pointer">
        <i class="fa-solid fa-xmark text-[12px]"></i>
    </button>`;

    tag.querySelector(".remove-tag").addEventListener("click", () => {

        // Retire le filtre du tableau activeFilters
        const index = activeFilters.indexOf(filterName.toLowerCase()); 
        if (index !== -1) {
            activeFilters.splice(index, 1); 
        }

        tag.remove();

        applyFilter(displayRecipes, allRecipes);
    });

    filtersContainer.appendChild(tag);
}

function removeTagFromUI(filter) {
    const tags = document.querySelectorAll(".filter-tag span");
    tags.forEach(tag => {
        if (tag.textContent.toLowerCase() === filter) {
            tag.parentElement.remove();
        }
    });
}
