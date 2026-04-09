// =========================================================
// MAXIBAZARD — Page Catalogue
// =========================================================
import { products } from './data.js';
import { buildPriceHTML, showToast } from './utils/helpers.js';
import { isFavorite, toggleFavorite } from './utils/favorites.js';
import { addToCart, updateCartBadge, getRealStock } from './utils/cart.js';

// ── DOM ────────────────────────────────────────────────────
const catalogGrid    = document.getElementById('catalog-grid');
const filterGender   = document.getElementById('filter-gender');
const filterType     = document.getElementById('filter-type');
const filterColor    = document.getElementById('filter-color');
const filterPromo    = document.getElementById('filter-promo');
const sortSelect     = document.getElementById('sort-select');
const resultsCount   = document.getElementById('results-count');
const resetBtn       = document.getElementById('reset-filters');

// ── INIT ───────────────────────────────────────────────────
function init() {
  updateCartBadge();
  document.getElementById('fav-count').textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
  populateFilters();
  render();
  bindEvents();
}

// ── REMPLISSAGE DYNAMIQUE DES FILTRES ─────────────────────
function populateFilters() {
  // Types uniques
  const types = [...new Set(products.map(p => p.characteristics.type))].sort();
  types.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t;
    filterType.appendChild(opt);
  });

  // Couleurs uniques
  const colors = [...new Set(products.flatMap(p => p.characteristics.colors))].sort();
  colors.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    filterColor.appendChild(opt);
  });
}

// ── FILTRAGE & TRI ─────────────────────────────────────────
function getFiltered() {
  let list = [...products];

  const gender = filterGender?.value;
  const type   = filterType?.value;
  const color  = filterColor?.value;
  const promoOnly = filterPromo?.checked;

  if (gender && gender !== 'all') list = list.filter(p => p.characteristics.gender === gender);
  if (type   && type   !== 'all') list = list.filter(p => p.characteristics.type === type);
  if (color  && color  !== 'all') list = list.filter(p => p.characteristics.colors.includes(color));
  if (promoOnly) list = list.filter(p => p.discount > 0);

  const sort = sortSelect?.value;
  const finalPrice = p => p.price * (1 - p.discount / 100);
  if (sort === 'asc')  list.sort((a, b) => finalPrice(a) - finalPrice(b));
  if (sort === 'desc') list.sort((a, b) => finalPrice(b) - finalPrice(a));
  if (sort === 'promo') list.sort((a, b) => b.discount - a.discount);

  return list;
}

// ── AFFICHAGE ─────────────────────────────────────────────
function render() {
  const list = getFiltered();
  resultsCount.textContent = `${list.length} produit${list.length > 1 ? 's' : ''}`;
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
    const stock = getRealStock(p);
    const isFav = isFavorite(p.id);
    const isOutOfStock = stock === 0;

    const card = document.createElement('article');
    card.className = `product-card${p.discount > 0 ? ' product-card--promo' : ''}${isOutOfStock ? ' product-card--soldout' : ''}`;

    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="card-img-link">
        <div class="card-img-wrap">
          ${p.discount > 0 ? `<span class="card-badge">-${p.discount}%</span>` : ''}
          ${isOutOfStock ? `<span class="card-badge card-badge--soldout">Épuisé</span>` : ''}
          <img src="${p.images[0]}" alt="${p.name}" class="card-img card-img--main" loading="lazy">
          ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name} vue 2" class="card-img card-img--hover" loading="lazy">` : ''}
        </div>
      </a>
      <div class="card-body">
        <span class="card-type">${p.characteristics.type}</span>
        <h3 class="card-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="card-price">${buildPriceHTML(p)}</div>
        <div class="card-colors">
          ${p.characteristics.colors.slice(0, 4).map(c => `<span class="color-dot" style="background:${colorToHex(c)}" title="${c}"></span>`).join('')}
        </div>
        <div class="card-actions">
          <button class="btn btn--cart btn--sm" data-id="${p.id}" ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Épuisé' : '+ Panier'}
          </button>
          <button class="btn-fav${isFav ? ' btn-fav--active' : ''}" data-id="${p.id}" aria-label="Favoris">
            ${isFav ? '♥' : '♡'}
          </button>
        </div>
      </div>
    `;

    catalogGrid.appendChild(card);
  });

  // Délégation d'events sur les cartes
  catalogGrid.querySelectorAll('.btn--cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const prod = products.find(p => p.id === btn.dataset.id);
      const result = addToCart(prod, 1, prod.characteristics.colors[0], prod.characteristics.sizes[0]);
      showToast(result.message, result.success ? 'success' : 'error');
    });
  });

  catalogGrid.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const added = toggleFavorite(btn.dataset.id);
      btn.textContent = added ? '♥' : '♡';
      btn.classList.toggle('btn-fav--active', added);
      document.getElementById('fav-count').textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
      showToast(added ? 'Ajouté aux favoris !' : 'Retiré des favoris.', added ? 'success' : 'info');
    });
  });
}

// ── EVENTS ─────────────────────────────────────────────────
function bindEvents() {
  [filterGender, filterType, filterColor, sortSelect].forEach(el => el?.addEventListener('change', render));
  filterPromo?.addEventListener('change', render);
  resetBtn?.addEventListener('click', () => {
    filterGender.value = 'all';
    filterType.value = 'all';
    filterColor.value = 'all';
    filterPromo.checked = false;
    sortSelect.value = 'default';
    render();
  });
}

// ── COULEUR → HEX (approximation visuelle) ─────────────────
function colorToHex(name) {
  const map = {
    'Blanc': '#FFFFFF', 'Noir': '#111111', 'Rouge': '#E63946', 'Bleu': '#457B9D',
    'Vert': '#2D6A4F', 'Jaune': '#FFD23F', 'Rose': '#FF85A1', 'Lilas': '#C77DFF',
    'Beige': '#D4A574', 'Gris': '#9B9B9B', 'Orange': '#F4A261', 'Kaki': '#8B8456',
    'Marine': '#1D3557', 'Bleu Ciel': '#90E0EF', 'Rouge Carmin': '#9B2226',
    'Vert Forêt': '#1B4332', 'Bleu Électrique': '#4361EE', 'Naturel': '#D4A373',
    'Crème': '#FFF8E7', 'Taupe': '#8D8074', 'Multicolore': 'linear-gradient(135deg,#E63946,#FFD23F,#2D6A4F)',
    'Gris + Beige': '#C9B99A', 'Blanc + Rose': '#FFB3C6', 'Bleu + Vert': '#2AB7CA',
    'Bleu + Naturel': '#90CAF9', 'Bleu + Jaune + Rouge': '#FF6B35',
  };
  return map[name] || '#CCCCCC';
}

init();
