// =========================================================
// MAXIBAZARD — Page Produit
// =========================================================
import { products } from './data.js';
import { buildPriceHTML, truncate, getProductIdFromUrl, showToast, formatPrice, getFinalPrice } from './utils/helpers.js';
import { addToCart, updateCartBadge, getRealStock } from './utils/cart.js';
import { isFavorite, toggleFavorite } from './utils/favorites.js';

// ── DOM ────────────────────────────────────────────────────
const productContainer = document.getElementById('product-container');
const similarContainer = document.getElementById('similar-container');

// ── INIT ───────────────────────────────────────────────────
function init() {
  updateCartBadge();
  document.getElementById('fav-count').textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;

  const id = getProductIdFromUrl();
  const product = products.find(p => p.id === id);

  if (!product) {
    productContainer.innerHTML = `
      <div class="not-found">
        <h2>Produit introuvable 😕</h2>
        <p>Cet article n'existe pas dans notre catalogue.</p>
        <a href="index.html" class="btn btn--primary">Retour au catalogue</a>
      </div>`;
    return;
  }

  renderProduct(product);
  renderSimilar(product);
  // Breadcrumb et titre
  const bc = document.getElementById('breadcrumb-name');
  if (bc) bc.textContent = product.name;
  document.title = `${product.name} — MAXIBAZARD`;
}

// ── AFFICHAGE PRODUIT ──────────────────────────────────────
function renderProduct(p) {
  const stock = getRealStock(p);
  const final = getFinalPrice(p.price, p.discount);
  const isFav = isFavorite(p.id);
  const isOutOfStock = stock === 0;

  // Carrousel miniatures
  const thumbsHTML = p.images.map((img, i) => `
    <button class="thumb${i === 0 ? ' thumb--active' : ''}" data-index="${i}" aria-label="Image ${i + 1}">
      <img src="${img}" alt="${p.name} vue ${i + 1}" loading="lazy">
    </button>`).join('');

  // Caractéristiques
  const charsHTML = Object.entries(p.characteristics).map(([key, val]) => {
    const labels = { gender: 'Genre', type: 'Type', colors: 'Couleurs', sizes: 'Tailles', material: 'Matière', dimensions: 'Dimensions' };
    const display = Array.isArray(val) ? val.join(', ') : val;
    return `<tr><th>${labels[key] || key}</th><td>${display}</td></tr>`;
  }).join('');

  // Options couleurs
  const colorsHTML = p.characteristics.colors.map((c, i) => `
    <button class="color-btn${i === 0 ? ' color-btn--selected' : ''}" data-color="${c}" style="--c:${colorToHex(c)}" title="${c}"></button>`).join('');

  // Options tailles
  const sizesHTML = p.characteristics.sizes.map((s, i) => `
    <button class="size-btn${i === 0 ? ' size-btn--selected' : ''}" data-size="${s}">${s}</button>`).join('');

  productContainer.innerHTML = `
    <div class="product-layout">

      <!-- GALERIE -->
      <div class="product-gallery">
        <div class="gallery-main">
          <button class="carousel-arrow carousel-arrow--prev" id="prev-btn" aria-label="Précédent">&#8592;</button>
          <div class="gallery-main-img-wrap">
            <img id="main-img" src="${p.images[0]}" alt="${p.name}" class="gallery-main-img">
            ${p.discount > 0 ? `<span class="gallery-badge">-${p.discount}%</span>` : ''}
          </div>
          <button class="carousel-arrow carousel-arrow--next" id="next-btn" aria-label="Suivant">&#8594;</button>
        </div>
        <div class="gallery-thumbs">${thumbsHTML}</div>
      </div>

      <!-- INFOS -->
      <div class="product-info">
        <span class="product-ref">Réf : ${p.id}</span>
        <h1 class="product-title">${p.name}</h1>

        <!-- Prix -->
        <div class="product-price-block">
          ${p.discount > 0
            ? `<span class="price-old">${formatPrice(p.price, p.currency)}</span>
               <span class="price-new">${formatPrice(final, p.currency)}</span>
               <span class="badge-promo">-${p.discount}%</span>`
            : `<span class="price-main">${formatPrice(p.price, p.currency)}</span>`
          }
        </div>

        <!-- Description -->
        <div class="product-desc" id="desc-block">
          <p id="desc-text">${truncate(p.description, 150)}</p>
          ${p.description.length > 150
            ? `<button class="btn-readmore" id="readmore-btn">Lire la suite ▾</button>`
            : ''}
        </div>

        <!-- Caractéristiques -->
        <div class="product-chars">
          <h3>Caractéristiques</h3>
          <table class="chars-table"><tbody>${charsHTML}</tbody></table>
        </div>

        <!-- Couleurs -->
        <div class="product-option">
          <label class="option-label">Couleur : <strong id="selected-color-label">${p.characteristics.colors[0]}</strong></label>
          <div class="color-picker">${colorsHTML}</div>
        </div>

        <!-- Tailles -->
        <div class="product-option">
          <label class="option-label">Taille : <strong id="selected-size-label">${p.characteristics.sizes[0]}</strong></label>
          <div class="size-picker">${sizesHTML}</div>
        </div>

        <!-- Quantité & Panier -->
        <div class="product-add">
          <div class="qty-control">
            <button class="qty-btn" id="qty-down">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="${stock}" class="qty-input">
            <button class="qty-btn" id="qty-up">+</button>
          </div>
          <button class="btn btn--primary btn--lg" id="add-cart-btn" ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? '😢 Épuisé' : '🛒 Ajouter au panier'}
          </button>
          <button class="btn-fav-lg${isFav ? ' btn-fav-lg--active' : ''}" id="fav-btn" data-id="${p.id}">
            ${isFav ? '♥ Dans les favoris' : '♡ Ajouter aux favoris'}
          </button>
        </div>

        <p class="stock-info ${stock <= 5 && stock > 0 ? 'stock-info--low' : ''}">
          ${isOutOfStock ? '❌ Rupture de stock' : stock <= 5 ? `⚠️ Plus que ${stock} en stock !` : `✅ En stock (${stock} disponibles)`}
        </p>
      </div>
    </div>
  `;

  // Init interactions
  setupCarousel(p.images);
  setupDescription(p.description);
  setupColorPicker(p);
  setupSizePicker();
  setupQty(stock);
  setupAddToCart(p);
  setupFavorite(p);
}

// ── CARROUSEL ─────────────────────────────────────────────
function setupCarousel(images) {
  let current = 0;
  const mainImg = document.getElementById('main-img');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const thumbs  = document.querySelectorAll('.thumb');

  function goTo(idx) {
    current = (idx + images.length) % images.length;
    mainImg.src = images[current];
    thumbs.forEach((t, i) => t.classList.toggle('thumb--active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  thumbs.forEach(t => t.addEventListener('click', () => goTo(parseInt(t.dataset.index))));
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

// ── SÉLECTEUR COULEUR ─────────────────────────────────────
function setupColorPicker(product) {
  const btns  = document.querySelectorAll('.color-btn');
  const label = document.getElementById('selected-color-label');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('color-btn--selected'));
      btn.classList.add('color-btn--selected');
      label.textContent = btn.dataset.color;
    });
  });
}

// ── SÉLECTEUR TAILLE ──────────────────────────────────────
function setupSizePicker() {
  const btns  = document.querySelectorAll('.size-btn');
  const label = document.getElementById('selected-size-label');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('size-btn--selected'));
      btn.classList.add('size-btn--selected');
      label.textContent = btn.dataset.size;
    });
  });
}

// ── QUANTITÉ ──────────────────────────────────────────────
function setupQty(stock) {
  const input   = document.getElementById('qty-input');
  const downBtn = document.getElementById('qty-down');
  const upBtn   = document.getElementById('qty-up');

  downBtn?.addEventListener('click', () => {
    input.value = Math.max(1, parseInt(input.value) - 1);
  });
  upBtn?.addEventListener('click', () => {
    input.value = Math.min(stock, parseInt(input.value) + 1);
  });
  input?.addEventListener('change', () => {
    input.value = Math.min(stock, Math.max(1, parseInt(input.value) || 1));
  });
}

// ── AJOUTER AU PANIER ────────────────────────────────────
function setupAddToCart(product) {
  const btn = document.getElementById('add-cart-btn');
  btn?.addEventListener('click', () => {
    const qty   = parseInt(document.getElementById('qty-input').value);
    const color = document.querySelector('.color-btn--selected')?.dataset.color || product.characteristics.colors[0];
    const size  = document.querySelector('.size-btn--selected')?.dataset.size  || product.characteristics.sizes[0];
    const result = addToCart(product, qty, color, size);
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
    document.getElementById('fav-count').textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
    showToast(added ? 'Ajouté aux favoris !' : 'Retiré des favoris.', added ? 'success' : 'info');
  });
}

// ── PRODUITS SIMILAIRES ───────────────────────────────────
function renderSimilar(current) {
  const similar = products
    .filter(p => p.characteristics.type === current.characteristics.type && p.id !== current.id)
    .slice(0, 4);

  if (!similar.length) {
    document.querySelector('.similar-section')?.remove();
    return;
  }

  similar.forEach(p => {
    const card = document.createElement('article');
    card.className = `product-card${p.discount > 0 ? ' product-card--promo' : ''}`;
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="card-img-link">
        <div class="card-img-wrap">
          ${p.discount > 0 ? `<span class="card-badge">-${p.discount}%</span>` : ''}
          <img src="${p.images[0]}" alt="${p.name}" class="card-img card-img--main" loading="lazy">
          ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name} vue 2" class="card-img card-img--hover" loading="lazy">` : ''}
        </div>
      </a>
      <div class="card-body">
        <span class="card-type">${p.characteristics.type}</span>
        <h3 class="card-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="card-price">${buildPriceHTML(p)}</div>
      </div>`;
    similarContainer.appendChild(card);
  });
}

// ── COULEUR → HEX ─────────────────────────────────────────
function colorToHex(name) {
  const map = {
    'Blanc': '#FFFFFF','Noir': '#111111','Rouge': '#E63946','Bleu': '#457B9D',
    'Vert': '#2D6A4F','Jaune': '#FFD23F','Rose': '#FF85A1','Lilas': '#C77DFF',
    'Beige': '#D4A574','Gris': '#9B9B9B','Orange': '#F4A261','Kaki': '#8B8456',
    'Marine': '#1D3557','Bleu Ciel': '#90E0EF','Naturel': '#D4A373',
    'Vert Forêt': '#1B4332','Bleu Électrique': '#4361EE','Crème': '#FFF8E7',
    'Multicolore':'#FF6B35',
  };
  return map[name] || '#CCCCCC';
}

init();
