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