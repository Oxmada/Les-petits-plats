![Logo Fisheye](assets/images/Logo.png)

---

## 🍔 Projet Les petits plats
Développement d’un site web permettant d’afficher des recettes de cuisine de manière dynamique en fonction du terme de recherché utilisé et
des filtres appliqués. 

---

## 📥 Installation

Ce projet utilise Tailwind CSS.

1. Clone le dépôt :  
   ```bash
   git clone https://github.com/Oxmada/Les-petits-plats.git
   cd Les-petits-plats
   ```

2. Installe les dépendances :  
   ```bash
   npm install
   ```

3. Installe Tailwind CSS et configure-le :  
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. Modifie `tailwind.config.js` :  
   ```js
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
   ```

5. Ajoute dans ton fichier CSS (ex. `src/styles.css`) :  
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. Lance le projet :  
   ```bash
   npm run dev
---

## 🔗 Liens utiles

| 🌐 **Version hébergée**                        | 🎨 **Maquette Figma**                              |
|-----------------------------------------------|--------------------------------------------------|
| [Voir en ligne](https://oxmada.github.io/Les-petits-plats/) | [Accéder à la maquette](https://www.figma.com/design/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?node-id=0-1&p=f&t=OBKWPCGKxVjJaqw6-0) |