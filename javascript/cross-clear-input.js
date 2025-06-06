export function initClearInput() {

    // Sécurité pour exécuté la fct que si le dom est chargé
    document.addEventListener("DOMContentLoaded", function () {
        const inputs = document.querySelectorAll(".search-dropdown-input");
        const crosses = document.querySelectorAll(".cross-dropdown-input");

        if (inputs.length === 0 || crosses.length === 0) return;

        inputs.forEach((input, index) => {
            const cross = crosses[index]; // Récupère l'élément cross avec le même index que l'input

            cross.addEventListener("click", function () {
                input.value = "";
                input.focus(); // Evite de cliquer à nouveau sur le champ pour renseigner une nouvelle valeur
                cross.style.display = "none"; 
            });

            input.addEventListener("input", function () {
                cross.style.display = input.value ? "block" : "none";
            });
        });
    });
}