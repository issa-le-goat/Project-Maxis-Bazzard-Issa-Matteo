// js/product.js
import { products } from './data.js';

// 1. RÉCUPÉRATION DE L'ID DANS L'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// On cherche le produit correspondant dans notre fausse base de données
const product = products.find(p => p.id === productId);

const productContainer = document.getElementById('single-product-container');

// Si l'utilisateur modifie l'URL avec un mauvais ID
if (!product) {
    productContainer.innerHTML = `<h2>Produit introuvable.</h2><a href="index.html">Retourner au catalogue</a>`;
} else {
    renderProductDetails(product);
    renderSimilarProducts(product);
}

// 2. FONCTION PRINCIPALE : AFFICHER LE PRODUIT
function renderProductDetails(product) {
    // Calcul du prix final
    let finalPrice = product.price;
    if (product.discount > 0) {
        finalPrice = product.price - (product.price * (product.discount / 100));
    }

    // Gestion de la description tronquée à 150 caractères (Brief)
    const isLongText = product.description.length > 150;
    const shortDesc = isLongText ? product.description.substring(0, 150) + "..." : product.description;

    // Génération des options de couleurs et tailles
    const colorOptions = product.characteristics.colors.map(color => `<option value="${color}">${color}</option>`).join('');
    const sizeOptions = product.characteristics.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

    // Génération des miniatures pour le carrousel
    const thumbnailsHTML = product.images.map((img, index) => `
        <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}" alt="Miniature ${index + 1}">
    `).join('');

    // Injection du HTML
    productContainer.innerHTML = `
        <div class="product-gallery">
            <div class="main-image-wrapper">
                <button id="prev-img" class="carousel-btn">❮</button>
                <img id="main-product-image" src="${product.images[0]}" alt="${product.name}">
                <button id="next-img" class="carousel-btn">❯</button>
            </div>
            <div class="thumbnails-container">
                ${thumbnailsHTML}
            </div>
        </div>

        <div class="product-info">
            <span class="ref">Réf: ${product.id}</span>
            <h1>${product.name}</h1>
            
            <div class="price-block">
                ${product.discount > 0 ? `<span class="old-price">${product.price.toFixed(2)} ${product.currency}</span>` : ''}
                <span class="current-price">${finalPrice.toFixed(2)} ${product.currency}</span>
            </div>

            <div class="description-block">
                <p id="desc-text">${shortDesc}</p>
                ${isLongText ? `<button id="read-more-btn" class="text-btn">Lire la suite</button>` : ''}
            </div>

            <div class="characteristics">
                <p><strong>Genre :</strong> ${product.characteristics.gender}</p>
                <p><strong>Type :</strong> ${product.characteristics.type}</p>
                
                <div class="selectors">
                    <div>
                        <label for="color-select">Couleur :</label>
                        <select id="color-select">${colorOptions}</select>
                    </div>
                    <div>
                        <label for="size-select">Taille :</label>
                        <select id="size-select">${sizeOptions}</select>
                    </div>
                </div>
            </div>

            <div class="add-to-cart-block">
                <input type="number" id="qty" value="1" min="1" max="${product.stock}">
                <button id="add-to-cart-btn" class="primary-btn">Ajouter au panier</button>
            </div>
            <p class="stock-info">En stock : ${product.stock} unités</p>
        </div>
    `;

    // --- ACTIVATION DES FONCTIONNALITÉS INTERACTIVES ---
    setupDescriptionToggle(product.description, shortDesc);
    setupCarousel(product.images);
}

// 3. LOGIQUE : DESCRIPTION TRONQUÉE
function setupDescriptionToggle(fullDesc, shortDesc) {
    const btn = document.getElementById('read-more-btn');
    const textNode = document.getElementById('desc-text');
    let isExpanded = false;

    if (btn) {
        btn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            textNode.textContent = isExpanded ? fullDesc : shortDesc;
            btn.textContent = isExpanded ? "Réduire" : "Lire la suite";
        });
    }
}

// 4. LOGIQUE : CARROUSEL D'IMAGES
function setupCarousel(imagesArray) {
    let currentIndex = 0;
    const mainImg = document.getElementById('main-product-image');
    const prevBtn = document.getElementById('prev-img');
    const nextBtn = document.getElementById('next-img');
    const thumbnails = document.querySelectorAll('.thumbnail');

    function updateImage(index) {
        mainImg.src = imagesArray[index];
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[index].classList.add('active');
        currentIndex = index;
    }

    prevBtn.addEventListener('click', () => {
        const newIndex = currentIndex === 0 ? imagesArray.length - 1 : currentIndex - 1;
        updateImage(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = currentIndex === imagesArray.length - 1 ? 0 : currentIndex + 1;
        updateImage(newIndex);
    });

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            updateImage(parseInt(e.target.dataset.index));
        });
    });
}

// 5. LOGIQUE : PRODUITS SIMILAIRES
function renderSimilarProducts(currentProduct) {
    const similarContainer = document.getElementById('similar-container');
    
    // On cherche les produits du même type, en excluant le produit actuel
    const similar = products.filter(p => 
        p.characteristics.type === currentProduct.characteristics.type && p.id !== currentProduct.id
    ).slice(0, 4); // On en garde 4 maximum

    if (similar.length === 0) {
        similarContainer.innerHTML = "<p>Aucun produit similaire pour le moment.</p>";
        return;
    }

    // On réutilise la même logique d'affichage que sur la page catalogue
    // (Dans un vrai projet, on mettrait cette fonction dans un fichier utils.js pour éviter de la dupliquer)
    similar.forEach(p => {
        const card = document.createElement('article');
        card.classList.add('product-card');
        card.innerHTML = `
            <a href="product.html?id=${p.id}" class="card-link">
                <div class="image-container">
                    <img src="${p.images[0]}" alt="${p.name}" class="img-main">
                </div>
                <div class="card-content">
                    <h3>${p.name}</h3>
                    <div class="price-container">
                        <span class="price">${p.price.toFixed(2)} ${p.currency}</span>
                    </div>
                </div>
            </a>
        `;
        similarContainer.appendChild(card);
    });
}