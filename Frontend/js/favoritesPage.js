// =========================================================
// MAXIBAZARD — Page Favoris
// =========================================================
import { products } from './data.js';
import { getFavorites, removeFavorite } from './utils/favorites.js';
import { addToCart, updateCartBadge } from './utils/cart.js';
import { buildPriceHTML, showToast } from './utils/helpers.js';

const favGrid = document.getElementById('fav-grid');

function init() {
  updateCartBadge();
  document.getElementById('fav-count').textContent = getFavorites().length;
  renderFavorites();
}

function renderFavorites() {
  const favIds = getFavorites();
  document.getElementById('fav-count').textContent = favIds.length;
  const badge = document.getElementById('fav-total-badge');
  if (badge) badge.textContent = favIds.length;
  favGrid.innerHTML = '';

  if (favIds.length === 0) {
    favGrid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">♡</span>
        <h2>Votre liste de favoris est vide</h2>
        <p>Ajoutez des produits depuis le catalogue ou les pages produit.</p>
        <a href="index.html" class="btn btn--primary">Découvrir le catalogue</a>
      </div>`;
    return;
  }

  const favProducts = products.filter(p => favIds.includes(p.id));

  favProducts.forEach(p => {
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
        <div class="card-actions">
          <button class="btn btn--cart btn--sm" data-id="${p.id}">+ Panier</button>
          <button class="btn btn--outline btn--sm btn--danger" data-remove="${p.id}">✕ Retirer</button>
        </div>
      </div>`;
    favGrid.appendChild(card);
  });

  // Events
  favGrid.querySelectorAll('.btn--cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = products.find(p => p.id === btn.dataset.id);
      const result = addToCart(prod, 1, prod.characteristics.colors[0], prod.characteristics.sizes[0]);
      showToast(result.message, result.success ? 'success' : 'error');
    });
  });

  favGrid.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFavorite(btn.dataset.remove);
      showToast('Retiré des favoris.', 'info');
      renderFavorites();
    });
  });
}

init();
