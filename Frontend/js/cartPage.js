// =========================================================
// MAXIBAZARD — Page Panier
// =========================================================
import { getCart, removeFromCart, updateCartItem, clearCart, getCartTotal, updateCartBadge, getRealStock } from './utils/cart.js';
import { formatPrice } from './utils/helpers.js';
import { showToast } from './utils/helpers.js';

const cartBody    = document.getElementById('cart-body');
const cartSummary = document.getElementById('cart-summary');

function init() {
  updateCartBadge();
  syncFavBadge();
  render();
}

function syncFavBadge() {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
}

function render() {
  const cart = getCart();
  cartBody.innerHTML = '';

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛒</span>
        <h2>Votre panier est vide</h2>
        <p>Découvrez notre catalogue de produits insolites !</p>
        <a href="index.html" class="btn btn--primary">Voir le catalogue</a>
      </div>`;
    cartSummary.innerHTML = '';
    return;
  }

  const table = document.createElement('div');
  table.className = 'cart-table';
  table.innerHTML = `
    <div class="cart-header">
      <span>Produit</span><span>Prix unitaire</span><span>Quantité</span><span>Total</span><span></span>
    </div>`;

  cart.forEach(item => {
    const stock     = getRealStock(item.couleurId, item.nomTaille, item.stockOrigine);
    const unitPrice = item.prix * (1 - item.reduction / 100);
    const lineTotal = unitPrice * item.quantity;

    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div class="cart-product">
        <img src="${item.productImage}" alt="${item.productNom}" class="cart-thumb" >
        <div class="cart-product-info">
          <a href="product.html?id=${item.productId}" class="cart-product-name">${item.productNom}</a>
          <div class="cart-product-options">
            <span>🎨 ${item.couleurNom}</span>
            <span>📐 ${item.nomTaille}</span>
          </div>
          ${item.reduction > 0 ? `<span class="badge-promo">-${item.reduction}%</span>` : ''}
        </div>
      </div>
      <div class="cart-unit-price">${formatPrice(unitPrice)}</div>
      <div class="cart-qty">
        <div class="qty-control">
          <button class="qty-btn" data-action="down"
            data-pid="${item.productId}" data-cid="${item.couleurId}" data-taille="${item.nomTaille}">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" data-action="up"
            data-pid="${item.productId}" data-cid="${item.couleurId}" data-taille="${item.nomTaille}"
            ${item.quantity >= stock ? 'disabled' : ''}>+</button>
        </div>
      </div>
      <div class="cart-line-total">${formatPrice(lineTotal)}</div>
      <div class="cart-remove">
        <button class="btn-remove"
          data-pid="${item.productId}" data-cid="${item.couleurId}" data-taille="${item.nomTaille}"
          aria-label="Supprimer">✕</button>
      </div>`;
    table.appendChild(row);
  });

  cartBody.appendChild(table);

  const actionsRow = document.createElement('div');
  actionsRow.className = 'cart-actions-row';
  actionsRow.innerHTML = `
    <button class="btn btn--outline btn--danger" id="clear-cart">🗑️ Vider le panier</button>
    <a href="index.html" class="btn btn--outline">← Continuer les achats</a>`;
  cartBody.appendChild(actionsRow);

  // Résumé
  const total     = getCartTotal();
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  cartSummary.innerHTML = `
    <div class="summary-card">
      <h3>Récapitulatif</h3>
      <div class="summary-line"><span>Articles (${itemCount})</span><span>${formatPrice(total)}</span></div>
      <div class="summary-line"><span>Livraison</span><span class="text-success">Gratuite</span></div>
      <div class="summary-line summary-line--total"><span>Total TTC</span><span>${formatPrice(total)}</span></div>
      <a href="checkout.html" class="btn btn--primary btn--full">Passer la commande →</a>
    </div>`;

  bindEvents();
}

function bindEvents() {
  // Quantité
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const { action, pid, cid, taille } = btn.dataset;
      const cart = getCart();
      const item = cart.find(i =>
        i.productId === parseInt(pid) && i.couleurId === parseInt(cid) && i.nomTaille === taille
      );
      if (!item) return;
      const newQty = action === 'up' ? item.quantity + 1 : item.quantity - 1;
      if (newQty === 0) {
        removeFromCart(parseInt(pid), parseInt(cid), taille);
        showToast('Article retiré du panier.', 'info');
      } else {
        updateCartItem(parseInt(pid), parseInt(cid), taille, newQty);
      }
      render();
    });
  });

  // Supprimer
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.pid), parseInt(btn.dataset.cid), btn.dataset.taille);
      showToast('Article supprimé.', 'info');
      render();
    });
  });

  // Vider
  document.getElementById('clear-cart')?.addEventListener('click', () => {
    if (confirm('Vider tout le panier ?')) {
      clearCart();
      showToast('Panier vidé.', 'info');
      render();
    }
  });
}

init();
