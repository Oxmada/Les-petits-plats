import {displayRecipes} from "./display.js";
import {recipes} from "../recipes.js";
import {createFilterTag, applyFilter, activeFilters} from "./filter_algo.js";

const handleDropdownSearch = (input, list, displayRecipes, allRecipes, createFilterTag, applyFilter, activeFilters, searchTerm) => {
    const keyword = input.value.toLowerCase().trim();
    if (activeFilters.includes(keyword) || !keyword) return;

    activeFilters.push(keyword);
    createFilterTag(keyword, displayRecipes, allRecipes);
    applyFilter(displayRecipes, allRecipes, searchTerm); // Passez searchTerm à applyFilter
    input.value = "";

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

            list.querySelectorAll("p").forEach(item => {
                const text = item.textContent.toLowerCase();
                const match = text.includes(keyword);
                item.style.display = match ? "flex" : "none";
            });

            updateCrossVisibility();
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                handleDropdownSearch(input, list, displayRecipes, recipes, createFilterTag, applyFilter, activeFilters, searchTerm);
                updateCrossVisibility();
            }
        });

        if (icon) {
            icon.addEventListener("click", () => {
                handleDropdownSearch(input, list, displayRecipes, recipes, createFilterTag, applyFilter, activeFilters, searchTerm);
            });
        }

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

