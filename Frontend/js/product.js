// =========================================================
// MAXIBAZARD — Page Produit (schéma couleur → images + tailles)
// =========================================================
import { products, getMainImage, getHoverImage, getPrixFinal, getColorStock } from './data.js';
import { buildPriceHTML, truncate, getProductIdFromUrl, showToast, formatPrice } from './utils/helpers.js';
import { addToCart, updateCartBadge, getRealStock } from './utils/cart.js';
import { isFavorite, toggleFavorite } from './utils/favorites.js';

// ── ÉTAT LOCAL ────────────────────────────────────────────
let currentCouleurIndex = 0;
let currentTailleIndex  = 0;
let currentImgIndex     = 0;

// ── INIT ───────────────────────────────────────────────────
function init() {
  updateCartBadge();
  syncFavBadge();

  const id      = getProductIdFromUrl();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    document.getElementById('product-container').innerHTML = `
      <div class="not-found">
        <h2>Produit introuvable 😕</h2>
        <a href="index.html" class="btn btn--primary">Retour au catalogue</a>
      </div>`;
    return;
  }

  document.title = `${product.nom} — MAXIBAZARD`;
  const bc = document.getElementById('breadcrumb-name');
  if (bc) bc.textContent = product.nom;

  renderProduct(product);
  renderSimilar(product);
}

function syncFavBadge() {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
}

// ── RENDU PRODUIT ──────────────────────────────────────────
function renderProduct(p) {
  const container = document.getElementById('product-container');
  const couleur0  = p.couleurs[0];
  const taille0   = couleur0.tailles[0];
  const final     = getPrixFinal(p);
  const isFav     = isFavorite(p.id);

  // Bloc couleurs (onglets)
  const couleursHTML = p.couleurs.map((c, i) => `
    <button class="couleur-tab${i === 0 ? ' couleur-tab--active' : ''}"
            data-couleur-index="${i}" title="${c.nom}">
      ${c.nom}
    </button>`).join('');

  // Miniatures initiales (couleur 0)
  const thumbsHTML = couleur0.images.map((img, i) => `
    <button class="thumb${i === 0 ? ' thumb--active' : ''}" data-index="${i}" aria-label="Image ${i+1}">
      <img src="${img.chemin}" alt="miniature ${i+1}" loading="lazy">
    </button>`).join('');

  // Tailles initiales (couleur 0)
  const taillesHTML = buildTaillesHTML(couleur0);

  // Caractéristiques
  const stockTotal = getColorStock(couleur0);
  const isOut      = stockTotal === 0;

  container.innerHTML = `
    <div class="product-layout">

      <!-- ── GALERIE ── -->
      <div class="product-gallery">
        <div class="gallery-main">
          <button class="carousel-arrow carousel-arrow--prev" id="prev-btn">&#8592;</button>
          <div class="gallery-main-img-wrap">
            <img id="main-img" src="${getMainImage(couleur0)}" alt="${p.nom}" class="gallery-main-img">
            ${p.reduction > 0 ? `<span class="gallery-badge">-${p.reduction}%</span>` : ''}
          </div>
          <button class="carousel-arrow carousel-arrow--next" id="next-btn">&#8594;</button>
        </div>
        <div class="gallery-thumbs" id="gallery-thumbs">${thumbsHTML}</div>
      </div>

      <!-- ── INFOS ── -->
      <div class="product-info">
        <span class="product-ref">Réf : ${String(p.id).padStart(3,'0')} · ${p.genre}</span>
        <h1 class="product-title">${p.nom}</h1>

        <!-- Prix -->
        <div class="product-price-block">
          ${p.reduction > 0
            ? `<span class="price-old">${formatPrice(p.prix)}</span>
               <span class="price-new">${formatPrice(final)}</span>
               <span class="badge-promo">-${p.reduction}%</span>`
            : `<span class="price-main">${formatPrice(p.prix)}</span>`}
        </div>

        <!-- Description tronquée -->
        <div class="product-desc">
          <p id="desc-text">${truncate(p.description, 150)}</p>
          ${p.description.length > 150
            ? `<button class="btn-readmore" id="readmore-btn">Lire la suite ▾</button>`
            : ''}
        </div>

        <!-- Caractéristiques fixes -->
        <div class="product-chars">
          <h3>Caractéristiques</h3>
          <table class="chars-table">
            <tr><th>Genre</th><td>${p.genre}</td></tr>
            <tr><th>Variantes</th><td>${p.couleurs.length} couleur${p.couleurs.length > 1 ? 's' : ''}</td></tr>
          </table>
        </div>

        <!-- Sélecteur COULEUR -->
        <div class="product-option">
          <label class="option-label">
            Couleur / Variante : <strong id="couleur-label">${couleur0.nom}</strong>
          </label>
          <div class="couleur-tabs" id="couleur-tabs">${couleursHTML}</div>
        </div>

        <!-- Sélecteur TAILLE (réactif à la couleur) -->
        <div class="product-option">
          <label class="option-label">
            Option : <strong id="taille-label">${taille0.nom}</strong>
          </label>
          <div class="size-picker" id="size-picker">${taillesHTML}</div>
        </div>

        <!-- Indicateur stock -->
        <p class="stock-info" id="stock-info">
          ${stockInfoHTML(taille0.stock, couleur0.id, taille0.nom)}
        </p>

        <!-- Quantité + Panier -->
        <div class="product-add">
          <div class="qty-control">
            <button class="qty-btn" id="qty-down">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="${taille0.stock}" class="qty-input">
            <button class="qty-btn" id="qty-up">+</button>
          </div>
          <button class="btn btn--primary btn--lg" id="add-cart-btn" ${isOut ? 'disabled' : ''}>
            ${isOut ? '😢 Épuisé' : '🛒 Ajouter au panier'}
          </button>
          <button class="btn-fav-lg${isFav ? ' btn-fav-lg--active' : ''}" id="fav-btn">
            ${isFav ? '♥ Dans les favoris' : '♡ Ajouter aux favoris'}
          </button>
        </div>

      </div><!-- /product-info -->
    </div><!-- /product-layout -->
  `;

  // Activation des interactions
  setupDescription(p.description);
  setupCouleurTabs(p);
  setupCarousel(couleur0.images);
  setupTaillePicker(couleur0);
  setupQtyButtons(taille0);
  setupAddToCart(p);
  setupFavorite(p);
}

// ── BLOC STOCK ────────────────────────────────────────────
function stockInfoHTML(stockOrigine, couleurId, nomTaille) {
  const stock = getRealStock(couleurId, nomTaille, stockOrigine);
  if (stock === 0)   return `<span style="color:var(--color-accent)">❌ Rupture de stock</span>`;
  if (stock <= 3)    return `<span style="color:var(--color-accent)">⚠️ Dernier${stock > 1 ? 's' : ''} exemplaire${stock > 1 ? 's' : ''} (${stock})</span>`;
  if (stock <= 10)   return `<span style="color:#e76f51">⚠️ Plus que ${stock} en stock !</span>`;
  return `<span style="color:var(--color-success)">✅ En stock (${stock})</span>`;
}

// ── TAILLES ───────────────────────────────────────────────
function buildTaillesHTML(couleur) {
  return couleur.tailles.map((t, i) => {
    const stock = getRealStock(couleur.id, t.nom, t.stock);
    return `
      <button class="size-btn${i === 0 ? ' size-btn--selected' : ''}${stock === 0 ? ' size-btn--soldout' : ''}"
              data-taille-index="${i}" ${stock === 0 ? 'disabled' : ''}>
        ${t.nom}
        ${stock === 0 ? '<span class="size-soldout-tag">épuisé</span>' : ''}
      </button>`;
  }).join('');
}

// ── ONGLETS COULEUR ───────────────────────────────────────
function setupCouleurTabs(product) {
  const tabs = document.getElementById('couleur-tabs');
  tabs?.addEventListener('click', e => {
    const btn = e.target.closest('.couleur-tab');
    if (!btn) return;
    currentCouleurIndex = parseInt(btn.dataset.couleurIndex);
    currentTailleIndex  = 0;
    currentImgIndex     = 0;

    const couleur = product.couleurs[currentCouleurIndex];

    // Mise à jour onglets
    tabs.querySelectorAll('.couleur-tab').forEach((b, i) =>
      b.classList.toggle('couleur-tab--active', i === currentCouleurIndex)
    );
    document.getElementById('couleur-label').textContent = couleur.nom;

    // Mise à jour carrousel
    updateCarousel(couleur.images, 0);

    // Mise à jour tailles
    const sizePicker = document.getElementById('size-picker');
    sizePicker.innerHTML = buildTaillesHTML(couleur);
    const firstTaille = couleur.tailles[0];
    document.getElementById('taille-label').textContent = firstTaille.nom;
    document.getElementById('stock-info').innerHTML     = stockInfoHTML(firstTaille.stock, couleur.id, firstTaille.nom);
    setupQtyButtons(firstTaille, couleur);
    setupTaillePickerEvents(couleur);
  });
}

// ── CARROUSEL ─────────────────────────────────────────────
function setupCarousel(images) {
  document.getElementById('prev-btn')?.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    updateCarouselIndex(images);
  });
  document.getElementById('next-btn')?.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % images.length;
    updateCarouselIndex(images);
  });
  document.getElementById('gallery-thumbs')?.addEventListener('click', e => {
    const btn = e.target.closest('.thumb');
    if (!btn) return;
    currentImgIndex = parseInt(btn.dataset.index);
    updateCarouselIndex(images);
  });
}

function updateCarouselIndex(images) {
  document.getElementById('main-img').src = images[currentImgIndex].chemin;
  document.querySelectorAll('.thumb').forEach((t, i) =>
    t.classList.toggle('thumb--active', i === currentImgIndex)
  );
}

function updateCarousel(images, idx) {
  currentImgIndex = idx;
  document.getElementById('main-img').src = images[idx].chemin;

  const thumbsContainer = document.getElementById('gallery-thumbs');
  thumbsContainer.innerHTML = images.map((img, i) => `
    <button class="thumb${i === idx ? ' thumb--active' : ''}" data-index="${i}">
      <img src="${img.chemin}" alt="miniature ${i+1}" loading="lazy">
    </button>`).join('');

  // Réattacher les events du carrousel avec les nouvelles images
  document.getElementById('prev-btn').onclick = () => {
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    updateCarouselIndex(images);
  };
  document.getElementById('next-btn').onclick = () => {
    currentImgIndex = (currentImgIndex + 1) % images.length;
    updateCarouselIndex(images);
  };
  thumbsContainer.addEventListener('click', e => {
    const btn = e.target.closest('.thumb');
    if (!btn) return;
    currentImgIndex = parseInt(btn.dataset.index);
    updateCarouselIndex(images);
  });
}

// ── TAILLE PICKER ─────────────────────────────────────────
function setupTaillePicker(couleur) {
  setupTaillePickerEvents(couleur);
}

function setupTaillePickerEvents(couleur) {
  document.getElementById('size-picker')?.addEventListener('click', e => {
    const btn = e.target.closest('.size-btn');
    if (!btn || btn.disabled) return;
    currentTailleIndex = parseInt(btn.dataset.tailleIndex);

    document.querySelectorAll('.size-btn').forEach((b, i) =>
      b.classList.toggle('size-btn--selected', i === currentTailleIndex)
    );

    const taille = couleur.tailles[currentTailleIndex];
    document.getElementById('taille-label').textContent = taille.nom;
    document.getElementById('stock-info').innerHTML     = stockInfoHTML(taille.stock, couleur.id, taille.nom);
    setupQtyButtons(taille, couleur);
  });
}

// ── QUANTITÉ ──────────────────────────────────────────────
function setupQtyButtons(taille, couleur = null) {
  const couleurObj = couleur || products.find(p =>
    p.couleurs.some(c => c.tailles.includes(taille))
  )?.couleurs[0];

  const realStock = couleurObj
    ? getRealStock(couleurObj.id, taille.nom, taille.stock)
    : taille.stock;

  const input   = document.getElementById('qty-input');
  const downBtn = document.getElementById('qty-down');
  const upBtn   = document.getElementById('qty-up');
  if (!input) return;

  input.max   = realStock;
  input.value = Math.min(parseInt(input.value) || 1, realStock || 1);

  downBtn.onclick = () => { input.value = Math.max(1, parseInt(input.value) - 1); };
  upBtn.onclick   = () => { input.value = Math.min(realStock, parseInt(input.value) + 1); };
  input.onchange  = () => { input.value = Math.min(realStock, Math.max(1, parseInt(input.value) || 1)); };
}

// ── DESCRIPTION ───────────────────────────────────────────
function setupDescription(fullDesc) {
  const btn  = document.getElementById('readmore-btn');
  const text = document.getElementById('desc-text');
  if (!btn) return;
  let expanded = false;
  btn.addEventListener('click', () => {
    expanded = !expanded;
    text.textContent = expanded ? fullDesc : truncate(fullDesc, 150);
    btn.textContent  = expanded ? 'Réduire ▴' : 'Lire la suite ▾';
  });
}

// ── AJOUTER AU PANIER ────────────────────────────────────
function setupAddToCart(product) {
  document.getElementById('add-cart-btn')?.addEventListener('click', () => {
    const couleur = product.couleurs[currentCouleurIndex];
    const taille  = couleur.tailles[currentTailleIndex];
    const qty     = parseInt(document.getElementById('qty-input').value) || 1;
    const result  = addToCart(product, couleur, taille, qty);
    showToast(result.message, result.success ? 'success' : 'error');
  });
}

// ── FAVORIS ───────────────────────────────────────────────
function setupFavorite(product) {
  const btn = document.getElementById('fav-btn');
  btn?.addEventListener('click', () => {
    const added = toggleFavorite(product.id);
    btn.textContent = added ? '♥ Dans les favoris' : '♡ Ajouter aux favoris';
    btn.classList.toggle('btn-fav-lg--active', added);
    syncFavBadge();
    showToast(added ? 'Ajouté aux favoris !' : 'Retiré des favoris.', added ? 'success' : 'info');
  });
}

// ── PRODUITS SIMILAIRES ───────────────────────────────────
function renderSimilar(current) {
  const container = document.getElementById('similar-container');
  if (!container) return;

  const similar = products
    .filter(p => p.genre === current.genre && p.id !== current.id)
    .slice(0, 4);

  if (!similar.length) {
    document.querySelector('.similar-section')?.remove();
    return;
  }

  similar.forEach(p => {
    const mainImg  = (p.couleurs[0].images.find(i => i.isMain) || p.couleurs[0].images[0])?.chemin || '';
    const hoverImg = p.couleurs[0].images.filter(i => !i.isMain)[0]?.chemin || mainImg;
    const card = document.createElement('article');
    card.className = `product-card${p.reduction > 0 ? ' product-card--promo' : ''}`;
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="card-img-link">
        <div class="card-img-wrap">
          ${p.reduction > 0 ? `<span class="card-badge">-${p.reduction}%</span>` : ''}
          <img src="${mainImg}"  alt="${p.nom}" class="card-img card-img--main"  loading="lazy">
          <img src="${hoverImg}" alt="${p.nom}" class="card-img card-img--hover" loading="lazy">
        </div>
      </a>
      <div class="card-body">
        <span class="card-type">${p.genre}</span>
        <h3 class="card-name"><a href="product.html?id=${p.id}">${p.nom}</a></h3>
        <div class="card-price">${buildPriceHTML(p)}</div>
      </div>`;
    container.appendChild(card);
  });
}

init();
