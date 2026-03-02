// js/catalog.js
import { products } from './data.js';

// 1. CIBLAGE DES ÉLÉMENTS DU DOM
const catalogContainer = document.getElementById('catalog-container');
const colorFilter = document.getElementById('color-filter');
const priceSort = document.getElementById('price-sort');

// 2. FONCTION D'AFFICHAGE (Celle qu'on a créée tout à l'heure)
function displayProducts(productsList) {
    catalogContainer.innerHTML = ''; 

    // Si aucun produit ne correspond au filtre
    if (productsList.length === 0) {
        catalogContainer.innerHTML = '<p>Aucun produit ne correspond à votre recherche.</p>';
        return;
    }

    productsList.forEach(product => {
        let finalPrice = product.price;
        let priceHTML = `<span class="price">${product.price.toFixed(2)} ${product.currency}</span>`;

        if (product.discount > 0) {
            finalPrice = product.price - (product.price * (product.discount / 100));
            priceHTML = `
                <span class="price old-price">${product.price.toFixed(2)} ${product.currency}</span>
                <span class="price new-price">${finalPrice.toFixed(2)} ${product.currency}</span>
                <span class="badge-discount">- ${product.discount}%</span>
            `;
        }

        const productCard = document.createElement('article');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <a href="product.html?id=${product.id}" class="card-link">
                <div class="image-container">
                    <img src="${product.images[0]}" alt="${product.name}" class="img-main">
                    ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.name} - vue 2" class="img-hover">` : ''}
                </div>
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <div class="price-container">
                        ${priceHTML}
                    </div>
                </div>
            </a>
        `;
        catalogContainer.appendChild(productCard);
    });
}

// 3. GÉNÉRATION DYNAMIQUE DES COULEURS
function populateColorFilter() {
    // On utilise un Set pour récupérer les couleurs uniques sans doublons
    const allColors = new Set();
    products.forEach(product => {
        product.characteristics.colors.forEach(color => allColors.add(color));
    });

    // On ajoute ces couleurs dans le menu déroulant HTML
    allColors.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        colorFilter.appendChild(option);
    });
}

// 4. LOGIQUE DE FILTRAGE ET DE TRI COMBINÉS
function updateCatalog() {
    const selectedColor = colorFilter.value;
    const selectedSort = priceSort.value;

    // A. Filtrage par couleur
    let filteredProducts = products;
    if (selectedColor !== 'all') {
        filteredProducts = products.filter(product => 
            product.characteristics.colors.includes(selectedColor)
        );
    }

    // B. Tri par prix (en prenant en compte la réduction !)
    // Fonction utilitaire pour obtenir le vrai prix final
    const getFinalPrice = (p) => p.price - (p.price * (p.discount / 100));

    if (selectedSort === 'asc') {
        filteredProducts.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    } else if (selectedSort === 'desc') {
        filteredProducts.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    }

    // C. On affiche le résultat final
    displayProducts(filteredProducts);
}

// 5. ÉCOUTEURS D'ÉVÉNEMENTS
// On écoute le changement ('change') sur les deux menus déroulants
colorFilter.addEventListener('change', updateCatalog);
priceSort.addEventListener('change', updateCatalog);

// 6. INITIALISATION AU CHARGEMENT DE LA PAGE
populateColorFilter(); // On remplit les options de couleurs
displayProducts(products); // On affiche tout par défaut