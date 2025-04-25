import {displayRecipes} from "./display.js";
import {recipes} from "../recipes.js";
import {createFilterTag, applyFilter, activeFilters} from "./filter_algo.js";

const handleDropdownSearch = (input, list, displayRecipes, allRecipes, createFilterTag, applyFilter, activeFilters) => {
  const keyword = input.value.toLowerCase().trim();
  if (activeFilters.includes(keyword) || !keyword) return;

  activeFilters.push(keyword);
  createFilterTag(keyword, displayRecipes, allRecipes);
  applyFilter(displayRecipes, allRecipes);
  input.value = "";

  if (list) {
    list.querySelectorAll("p").forEach(item => item.style.display = "block");
  }
};


export const initAllDropdownSearch = () => {
    const dropdowns = document.querySelectorAll(".search-dropdown-input");
    const icons = document.querySelectorAll(".search-dropdown-icone");
  
    dropdowns.forEach((input, index) => {
      const list = input.closest(".dropdown-content").querySelector(".ingredients-list, .appliance-list, .ustensils-list");
  
      input.addEventListener("input", () => {
        if (!list) return;
        const keyword = input.value.toLowerCase().trim();
  
        list.querySelectorAll("p").forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(keyword) ? "block" : "none";
        });
      });
  
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          handleDropdownSearch(input, list, displayRecipes, recipes, createFilterTag, applyFilter, activeFilters);
        }
      });
  
      const icon = icons[index];
      if (icon) {
        icon.addEventListener("click", () => {
          handleDropdownSearch(input, list, displayRecipes, recipes, createFilterTag, applyFilter, activeFilters);
        });
      }
    });
  };