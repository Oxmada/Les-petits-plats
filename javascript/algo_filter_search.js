import {displayRecipes} from "./display.js";
import {recipes} from "../recipes.js";
import {applyFilter, activeFilters} from "./filter_algo.js";
import {createFilterTag} from "./createFilterTag.js"

const handleDropdownSearch = (input, list, displayRecipes, allRecipes, createFilterTag, applyFilter, activeFilters, searchTerm) => {
    const keyword = input.value.toLowerCase().trim();
    console.log(keyword)

    // vérifie si keyword est deja dans activefilters
    if (activeFilters.includes(keyword) || !keyword) return;

    // Ajoute keyword à activefilters
    activeFilters.push(keyword);
    createFilterTag(keyword, displayRecipes, allRecipes);
    applyFilter(displayRecipes, allRecipes, searchTerm);
    input.value = "";

    // Réaffiche tous les éléments de la liste du dropdown
    if (list) {
        list.querySelectorAll("p").forEach(item => item.style.display = "block");
    }
};

export const initAllDropdownSearch = (searchTerm) => {
    const dropdowns = document.querySelectorAll(".search-dropdown-input");
    const icons = document.querySelectorAll(".search-dropdown-icone");
    const crosses = document.querySelectorAll(".cross-dropdown-input");

    dropdowns.forEach((input, index) => {
        const list = input.closest(".dropdown-content").querySelector(".ingredients-list, .appliance-list, .ustensils-list");

        // Associe l'icône et la croix à l’input courant via l’index
        const icon = icons[index];
        const cross = crosses[index];

        const updateCrossVisibility = () => {
            if (input.value.trim()) {
                cross.style.display = "block";
            } else {
                cross.style.display = "none";
            }
        };

        input.addEventListener("input", () => {
            if (!list) return;
            const keyword = input.value.toLowerCase().trim();
            
            // Filtre dynamiquement la liste selon ce que l’utilisateur tape
            list.querySelectorAll("p").forEach(item => {
                const text = item.textContent.toLowerCase();
                const match = text.includes(keyword);

                // Cache les éléments qui ne correspondent pas.
                item.style.display = match ? "flex" : "none";
            });

            updateCrossVisibility();
        });

        // Ajout d’un filtre avec la touche Entrée
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleDropdownSearch(input, list, displayRecipes, recipes, createFilterTag, applyFilter, activeFilters, searchTerm);
                updateCrossVisibility();
            }
        });

        // Ajout d’un filtre avec le clic sur l’icône search
        if (icon) {
            icon.addEventListener("click", () => {
                handleDropdownSearch(input, list, displayRecipes, recipes, createFilterTag, applyFilter, activeFilters, searchTerm);
            });
        }


        // Réinitialisation de l’input avec la croix
        if (cross) {
            cross.addEventListener("click", () => {
                input.value = "";
                updateCrossVisibility();

                if (list) {
                    list.querySelectorAll("p").forEach(item => {
                        item.style.display = "flex"; // tout réafficher
                    });
                }
            });
        }
        
        // Cache initialement la croix
        updateCrossVisibility();
    });
};

