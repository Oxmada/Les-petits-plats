 // Utiliser des ensembles pour stocker les valeurs uniques
 const uniqueIngredients = new Set();
 const uniqueAppliances = new Set();
 const uniqueUstensils = new Set();


export function recipeTemplate(data) {
    const {id, image, name, servings, ingredients, time, description, appliance, ustensils} = data;

    const picture = `../assets/json-recipes/${image}`;

    function getRecipeCardDom() {
        const article = document.createElement("article");
        article.classList.add("recipe-article");

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt",`Image de ${name}`);
        img.classList.add("recipe-img");
        
        const timeTag = document.createElement("span");
        timeTag.classList.add("recipe-time");
        timeTag.textContent = `${time}min`;

        article.appendChild(img);
        article.appendChild(timeTag);

        const content = document.createElement("div");
        content.classList.add("recipe-content");


        const title = document.createElement("h2");
        title.classList.add("recipe-name");
        title.textContent = name;

        const subtitleRecipe = document.createElement("h3");
        subtitleRecipe.classList.add("recipe-subtitle");
        subtitleRecipe.textContent = "RECETTE";


        const pDescription = document.createElement("p");
        pDescription.classList.add("recipe-description");
        pDescription.textContent = description;

        const subtitleIngredients = document.createElement("h3");
        subtitleIngredients.classList.add("recipe-subtitle");
        subtitleIngredients.textContent = "INGRÉDIENTS"


        const ulIngredients = document.createElement("ul");
        ulIngredients.classList.add("recipe-ingredients");

        ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.innerHTML = `${ingredient.ingredient}<br>
            <span class="sub-info">${ingredient.quantity || ""} ${ingredient.unit || ""}</span>`;
            ulIngredients.appendChild(li);
        });


        content.appendChild(title);
        content.appendChild(subtitleRecipe);
        content.appendChild(pDescription);
        content.appendChild(subtitleIngredients);
        content.appendChild(ulIngredients);

        article.appendChild(content);

        return article;
    }

    function getFiltersInfoDom() {
        const ingredientsList = document.querySelector(".ingredients-list");
        const applianceList = document.querySelector(".appliance-list");
        const ustensilsList = document.querySelector(".ustensils-list");
      
        
        // Ajout des ingrédients uniques
        ingredients.forEach(item => {
            const name = item.ingredient.toLowerCase();
            if (!uniqueIngredients.has(name)) {
                uniqueIngredients.add(name);
                const p = document.createElement("p");
                p.textContent = item.ingredient;
                ingredientsList.appendChild(p);
            }
        });

        // Ajout de l’appareil unique
        const applianceName = appliance.toLowerCase();
        if (!uniqueAppliances.has(applianceName)) {
            uniqueAppliances.add(applianceName);
            const p = document.createElement("p");
            p.textContent = `${appliance}`;
            applianceList.appendChild(p);
        }

        // Ajout des ustensiles uniques
        ustensils.forEach(u => {
            const name = u.toLowerCase();
            if (!uniqueUstensils.has(name)) {
                uniqueUstensils.add(name);
                const p = document.createElement("p");
                p.textContent = u;
                ustensilsList.appendChild(p);
            }
        });

        return {ingredientsList, applianceList, ustensilsList};

    }

    return {id, image, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDom, getFiltersInfoDom};
}