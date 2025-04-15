export function initClearInput() {
    document.addEventListener("DOMContentLoaded", function () {
        const inputs = document.querySelectorAll(".search-dropdown-input");
        const crosses = document.querySelectorAll(".cross-dropdown-input");

        if (inputs.length === 0 || crosses.length === 0) return;

        inputs.forEach((input, index) => {
            const cross = crosses[index];

            cross.addEventListener("click", function () {
                input.value = "";
                input.focus();
                cross.style.display = "none"; 
            });

            input.addEventListener("input", function () {
                cross.style.display = input.value ? "block" : "none";
            });
        });
    });
}