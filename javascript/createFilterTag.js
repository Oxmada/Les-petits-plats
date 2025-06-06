import {applyFilter, activeFilters} from "./filter_algo.js";

export const createFilterTag = (filterName, displayRecipes, allRecipes) => {
    const filtersContainer = document.querySelector(".active-filters");

    const tag = document.createElement("div");
    tag.className = "filter-tag bg-[#FFD15B] text-[14px] px-4 py-4 rounded-[10px] flex items-center gap-2";

    // Définit le contenu HTML du tag
    tag.innerHTML = `
    <span>${filterName}</span>
    <button class="remove-tag cursor-pointer">
        <i class="fa-solid fa-xmark text-[12px]"></i>
    </button>`;

    tag.querySelector(".remove-tag").addEventListener("click", () => {

        // Supprime le filtre du tableau activeFilters si trouvé
        const index = activeFilters.indexOf(filterName.toLowerCase());
        if (index !== -1) activeFilters.splice(index, 1);

        tag.remove();

        const allItems = document.querySelectorAll(".ingredients-list p, .appliance-list p, .ustensils-list p");
        allItems.forEach(item => {

            // Trouve l'élément <p> qui correspond au filtre supprimé
            if (item.textContent.toLowerCase() === filterName.toLowerCase()) {

                // Réinitialise le style du filtre supprimé dans le dropdown 
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