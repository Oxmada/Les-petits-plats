export function initDropdowns() {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach(button => {
        const chevronIcon = button.querySelector('.icone-chevron');

        // Ajouter un gestionnaire d'événements pour le bouton
        button.addEventListener("click", function(event) {
            const dropdownContent = this.nextElementSibling;
            dropdownContent.classList.toggle('show');
            chevronIcon.classList.toggle('rotated');
            button.classList.toggle('rounded-top'); // Ajoute ou supprime la classe rounded-top
            event.stopPropagation(); // Empêche la propagation de l'événement
        });

        // Ajouter un gestionnaire d'événements pour l'icône chevron
        chevronIcon.addEventListener("click", function(event) {
            const dropdownContent = button.nextElementSibling;
            dropdownContent.classList.toggle('show');
            chevronIcon.classList.toggle('rotated');
            button.classList.toggle('rounded-top'); // Ajoute ou supprime la classe rounded-top
            event.stopPropagation(); // Empêche la propagation de l'événement
        });
    });

    // Fermer le menu déroulant si l'utilisateur clique en dehors
    window.addEventListener("click", function(event) {
        dropdownButtons.forEach(button => {
            const dropdownContent = button.nextElementSibling;
            const chevronIcon = button.querySelector('.icone-chevron');
            if (!dropdownContent.contains(event.target) && !button.contains(event.target)) {
                dropdownContent.classList.remove('show');
                chevronIcon.classList.remove('rotated');
                button.classList.remove('rounded-top'); // Supprime la classe rounded-top
            }
        });
    });
}