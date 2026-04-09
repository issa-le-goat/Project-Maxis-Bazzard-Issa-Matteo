// =========================================================
// MAXIBAZARD — Page Panier
// =========================================================
import { products } from './data.js';
import { getCart, removeFromCart, updateCartItem, clearCart, getCartTotal, updateCartBadge, getRealStock } from './utils/cart.js';
import { formatPrice, getFinalPrice, showToast } from './utils/helpers.js';

const cartBody    = document.getElementById('cart-body');
const cartSummary = document.getElementById('cart-summary');

function init() {
  updateCartBadge();
  document.getElementById('fav-count').textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
  renderCart();
}

function renderCart() {
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

  // Tableau des articles
  const table = document.createElement('div');
  table.className = 'cart-table';
  table.innerHTML = `
    <div class="cart-header">
      <span>Produit</span><span>Prix unit.</span><span>Quantité</span><span>Total</span><span></span>
    </div>`;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    const stock = product ? getRealStock(product) : item.quantity;
    const unitPrice = getFinalPrice(item.price, item.discount);
    const lineTotal = unitPrice * item.quantity;

    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div class="cart-product">
        <img src="${item.productImage}" alt="${item.productName}" class="cart-thumb">
        <div class="cart-product-info">
          <a href="product.html?id=${item.productId}" class="cart-product-name">${item.productName}</a>
          <div class="cart-product-options">
            <span>Couleur : ${item.selectedColor}</span>
            <span>Taille : ${item.selectedSize}</span>
          </div>
          ${item.discount > 0 ? `<span class="badge-promo">-${item.discount}%</span>` : ''}
        </div>
      </div>
      <div class="cart-unit-price">${formatPrice(unitPrice, item.currency)}</div>
      <div class="cart-qty">
        <div class="qty-control">
          <button class="qty-btn" data-action="down" data-id="${item.productId}" data-color="${item.selectedColor}" data-size="${item.selectedSize}">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" data-action="up" data-id="${item.productId}" data-color="${item.selectedColor}" data-size="${item.selectedSize}" ${item.quantity >= stock ? 'disabled' : ''}>+</button>
        </div>
      </div>
      <div class="cart-line-total">${formatPrice(lineTotal, item.currency)}</div>
      <div class="cart-remove">
        <button class="btn-remove" data-id="${item.productId}" data-color="${item.selectedColor}" data-size="${item.selectedSize}" aria-label="Supprimer">✕</button>
      </div>`;

    table.appendChild(row);
  });

  cartBody.appendChild(table);

  // Bouton vider
  const clearRow = document.createElement('div');
  clearRow.className = 'cart-actions-row';
  clearRow.innerHTML = `
    <button class="btn btn--outline btn--danger" id="clear-cart">🗑️ Vider le panier</button>
    <a href="index.html" class="btn btn--outline">← Continuer les achats</a>`;
  cartBody.appendChild(clearRow);

  // Récapitulatif
  const total = getCartTotal();
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  cartSummary.innerHTML = `
    <div class="summary-card">
      <h3>Récapitulatif</h3>
      <div class="summary-line"><span>Articles (${itemCount})</span><span>${formatPrice(total, '€')}</span></div>
      <div class="summary-line"><span>Livraison</span><span class="text-success">Gratuite</span></div>
      <div class="summary-line summary-line--total"><span>Total TTC</span><span>${formatPrice(total, '€')}</span></div>
      <a href="checkout.html" class="btn btn--primary btn--full">Passer la commande →</a>
    </div>`;

  bindCartEvents();
}

function bindCartEvents() {
  // Quantité
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const { action, id, color, size } = btn.dataset;
      const cart = getCart();
      const item = cart.find(i => i.productId === id && i.selectedColor === color && i.selectedSize === size);
      if (!item) return;
      const product = products.find(p => p.id === id);
      const newQty = action === 'up' ? item.quantity + 1 : item.quantity - 1;
      if (newQty === 0) {
        removeFromCart(id, color, size);
        showToast('Article retiré du panier.', 'info');
      } else {
        updateCartItem(id, color, size, newQty, product);
      }
      renderCart();
    });
  });

  // Supprimer
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id, btn.dataset.color, btn.dataset.size);
      showToast('Article supprimé.', 'info');
      renderCart();
    });
  });

  // Vider
  document.getElementById('clear-cart')?.addEventListener('click', () => {
    if (confirm('Vider tout le panier ?')) {
      clearCart();
      showToast('Panier vidé.', 'info');
      renderCart();
    }
  });
}

init();
