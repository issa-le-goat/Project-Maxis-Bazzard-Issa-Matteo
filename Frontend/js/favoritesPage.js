// =========================================================
// MAXIBAZARD — Page Favoris
// =========================================================
import { products, getMainImage, getHoverImage, getPrixFinal } from './data.js';
import { getFavorites, removeFavorite } from './utils/favorites.js';
import { addToCart, updateCartBadge } from './utils/cart.js';
import { buildPriceHTML, showToast } from './utils/helpers.js';

const favGrid = document.getElementById('fav-grid');

function init() {
  updateCartBadge();
  render();
}

function render() {
  const favIds  = getFavorites();
  const badge   = document.getElementById('fav-count');
  const badge2  = document.getElementById('fav-total-badge');
  if (badge)  badge.textContent  = favIds.length;
  if (badge2) badge2.textContent = favIds.length;
  favGrid.innerHTML = '';

  if (favIds.length === 0) {
    favGrid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">♡</span>
        <h2>Votre liste de favoris est vide</h2>
        <p>Ajoutez des produits depuis le catalogue ou les fiches produit.</p>
        <a href="index.html" class="btn btn--primary">Découvrir le catalogue</a>
      </div>`;
    return;
  }

  const favProducts = products.filter(p => favIds.includes(p.id));
  favProducts.forEach(p => {
    const mainImg  = getMainImage(p.couleurs[0]);
    const hoverImg = getHoverImage(p.couleurs[0]);

    const card = document.createElement('article');
    card.className = `product-card${p.reduction > 0 ? ' product-card--promo' : ''}`;
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="card-img-link">
        <div class="card-img-wrap">
          ${p.reduction > 0 ? `<span class="card-badge">-${p.reduction}%</span>` : ''}
          <img src="${mainImg}"  alt="${p.nom}" class="card-img card-img--main"  loading="lazy" >
          <img src="${hoverImg}" alt="${p.nom}" class="card-img card-img--hover" loading="lazy" >
        </div>
      </a>
      <div class="card-body">
        <span class="card-type">${p.genre}</span>
        <h3 class="card-name"><a href="product.html?id=${p.id}">${p.nom}</a></h3>
        <div class="card-price">${buildPriceHTML(p)}</div>
        <div class="card-actions">
          <button class="btn btn--cart btn--sm" data-id="${p.id}">+ Panier</button>
          <button class="btn btn--outline btn--sm btn--danger" data-remove="${p.id}">✕ Retirer</button>
        </div>
      </div>`;
    favGrid.appendChild(card);
  });

  favGrid.querySelectorAll('.btn--cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod         = products.find(p => p.id === parseInt(btn.dataset.id));
      const firstCouleur = prod.couleurs[0];
      const firstTaille  = firstCouleur.tailles[0];
      const result = addToCart(prod, firstCouleur, firstTaille, 1);
      showToast(result.message, result.success ? 'success' : 'error');
    });
  });

  favGrid.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFavorite(parseInt(btn.dataset.remove));
      showToast('Retiré des favoris.', 'info');
      render();
    });
  });
}

init();
