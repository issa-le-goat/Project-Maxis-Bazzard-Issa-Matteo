// =========================================================
// MAXIBAZARD — Page Catalogue
// =========================================================
import { products, getProductMainImage, getProductHoverImage, getPrixFinal, getTotalStock } from './data.js';
import { buildPriceHTML, showToast } from './utils/helpers.js';
import { isFavorite, toggleFavorite } from './utils/favorites.js';
import { addToCart, updateCartBadge } from './utils/cart.js';



// ── DOM ───────────────────────────────────────────────────
const catalogGrid  = document.getElementById('catalog-grid');
const filterGenre  = document.getElementById('filter-genre');
const filterColor  = document.getElementById('filter-color');
const filterPromo  = document.getElementById('filter-promo');
const sortSelect   = document.getElementById('sort-select');
const resultsCount = document.getElementById('results-count');
const resetBtn     = document.getElementById('reset-filters');

// ── INIT ──────────────────────────────────────────────────
function init() {
  updateCartBadge();
  syncFavBadge();
  populateFilters();
  render();
  bindEvents();
}

function syncFavBadge() {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
}

// ── FILTRES DYNAMIQUES ────────────────────────────────────
function populateFilters() {
  const genres = [...new Set(products.map(p => p.genre))].sort();
  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = g;
    filterGenre?.appendChild(opt);
  });

  const colors = [...new Set(products.flatMap(p => p.couleurs.map(c => c.nom)))].sort();
  colors.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    filterColor?.appendChild(opt);
  });
}

// ── FILTRAGE & TRI ────────────────────────────────────────
function getFiltered() {
  let list = [...products];

  const genre   = filterGenre?.value;
  const color   = filterColor?.value;
  const promoOn = filterPromo?.checked;

  if (genre  && genre  !== 'all') list = list.filter(p => p.genre === genre);
  if (color  && color  !== 'all') list = list.filter(p => p.couleurs.some(c => c.nom === color));
  if (promoOn)                    list = list.filter(p => p.reduction > 0);

  const sort = sortSelect?.value;
  if (sort === 'asc')   list.sort((a, b) => getPrixFinal(a) - getPrixFinal(b));
  if (sort === 'desc')  list.sort((a, b) => getPrixFinal(b) - getPrixFinal(a));
  if (sort === 'promo') list.sort((a, b) => b.reduction - a.reduction);

  return list;
}

// ── RENDU ─────────────────────────────────────────────────
function render() {
  const list = getFiltered();
  if (resultsCount) resultsCount.textContent = `${list.length} produit${list.length > 1 ? 's' : ''}`;
  catalogGrid.innerHTML = '';

  if (list.length === 0) {
    catalogGrid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <p>Aucun produit ne correspond à vos filtres.</p>
        <button class="btn btn--outline" onclick="document.getElementById('reset-filters').click()">Réinitialiser</button>
      </div>`;
    return;
  }

  list.forEach(p => {
    const totalStock   = getTotalStock(p);
    const isFav        = isFavorite(p.id);
    const isOutOfStock = totalStock === 0;
    const mainImg      = getProductMainImage(p)  || '';
    const hoverImg     = getProductHoverImage(p) || mainImg;

    const card = document.createElement('article');
    card.className = [
      'product-card',
      p.reduction > 0 ? 'product-card--promo'   : '',
      isOutOfStock    ? 'product-card--soldout' : ''
    ].filter(Boolean).join(' ');

    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="card-img-link">
        <div class="card-img-wrap">
          ${p.reduction > 0 ? `<span class="card-badge">-${p.reduction}%</span>` : ''}
          ${isOutOfStock    ? `<span class="card-badge card-badge--soldout">Épuisé</span>` : ''}
          <img
            src="${mainImg}"
            alt="${p.nom}"
            class="card-img card-img--main"
            loading="lazy"
            onerror="this.onerror=null;this.src=''"
          >
          <img
            src="${hoverImg}"
            alt="${p.nom} - vue 2"
            class="card-img card-img--hover"
            loading="lazy"
            onerror="this.onerror=null;this.src=''"
          >
        </div>
      </a>
      <div class="card-body">
        <span class="card-type">${p.genre}</span>
        <h3 class="card-name"><a href="product.html?id=${p.id}">${p.nom}</a></h3>
        <div class="card-price">${buildPriceHTML(p)}</div>
        <div class="card-variants">
          ${p.couleurs.map(c => `<span class="variant-pill" title="${c.nom}">${c.nom.split(' ')[0]}</span>`).join('')}
        </div>
        <div class="card-actions">
          <button class="btn btn--cart btn--sm" data-id="${p.id}" ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Épuisé' : '+ Panier'}
          </button>
          <button class="btn-fav${isFav ? ' btn-fav--active' : ''}" data-id="${p.id}" aria-label="Favoris">
            ${isFav ? '♥' : '♡'}
          </button>
        </div>
      </div>`;

    catalogGrid.appendChild(card);
  });

  // Événements délégués
  catalogGrid.querySelectorAll('.btn--cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const prod = products.find(p => p.id === parseInt(btn.dataset.id));
      if (!prod) return;
      const result = addToCart(prod, prod.couleurs[0], prod.couleurs[0].tailles[0], 1);
      showToast(result.message, result.success ? 'success' : 'error');
    });
  });

  catalogGrid.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const added = toggleFavorite(parseInt(btn.dataset.id));
      btn.textContent = added ? '♥' : '♡';
      btn.classList.toggle('btn-fav--active', added);
      syncFavBadge();
      showToast(added ? 'Ajouté aux favoris !' : 'Retiré des favoris.', added ? 'success' : 'info');
    });
  });
}

// ── ÉVÉNEMENTS ────────────────────────────────────────────
function bindEvents() {
  [filterGenre, filterColor, sortSelect].forEach(el => el?.addEventListener('change', render));
  filterPromo?.addEventListener('change', render);
  resetBtn?.addEventListener('click', () => {
    if (filterGenre) filterGenre.value  = 'all';
    if (filterColor) filterColor.value  = 'all';
    if (filterPromo) filterPromo.checked = false;
    if (sortSelect)  sortSelect.value   = 'default';
    render();
  });
}

init();
