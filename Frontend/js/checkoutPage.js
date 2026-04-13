// =========================================================
// MAXIBAZARD — Checkout
// =========================================================
import { getCart, clearCart, getCartTotal, deductStock, updateCartBadge } from './utils/cart.js';
import { formatPrice, showToast } from './utils/helpers.js';

const ADDR_KEY = 'maxibazard_address';

function init() {
  updateCartBadge();
  syncFavBadge();
  const cart = getCart();
  if (cart.length === 0) {
    document.getElementById('checkout-container').innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <span class="empty-icon">🛒</span>
        <h2>Votre panier est vide</h2>
        <a href="index.html" class="btn btn--primary">Retour au catalogue</a>
      </div>`;
    return;
  }
  renderOrderSummary(cart);
  loadSavedAddress();
  bindForm();
}

function syncFavBadge() {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;
}

function renderOrderSummary(cart) {
  const container = document.getElementById('order-summary');
  let html = '<h3>Récapitulatif</h3><div class="summary-items">';
  let total = 0;
  cart.forEach(item => {
    const unitPrice = item.prix * (1 - item.reduction / 100);
    const lineTotal = unitPrice * item.quantity;
    total += lineTotal;
    html += `
      <div class="summary-item">
        <img src="${item.productImage}" alt="${item.productNom}" class="summary-thumb">
        <div class="summary-item-info">
          <span class="summary-item-name">${item.productNom}</span>
          <span class="summary-item-opts">${item.couleurNom} · ${item.nomTaille} · ×${item.quantity}</span>
        </div>
        <span class="summary-item-price">${formatPrice(lineTotal)}</span>
      </div>`;
  });
  html += `</div>
    <div class="summary-totals">
      <div class="summary-line"><span>Sous-total</span><span>${formatPrice(total)}</span></div>
      <div class="summary-line"><span>Livraison</span><span class="text-success">Gratuite</span></div>
      <div class="summary-line summary-line--total"><span>Total TTC</span><span>${formatPrice(total)}</span></div>
    </div>`;
  container.innerHTML = html;
}

function loadSavedAddress() {
  const saved = JSON.parse(localStorage.getItem(ADDR_KEY) || 'null');
  if (!saved) return;
  ['name','street','complement','city','postal','country'].forEach(k => {
    const el = document.getElementById(`addr-${k}`);
    if (el) el.value = saved[k] || (k === 'country' ? 'France' : '');
  });
  document.getElementById('saved-addr-banner').innerHTML = `
    <div class="saved-addr-notice">
      <strong>📍 Adresse enregistrée :</strong>
      ${saved.name}, ${saved.street}${saved.complement ? ' ' + saved.complement : ''}, ${saved.postal} ${saved.city}, ${saved.country}
    </div>`;
}

function bindForm() {
  document.getElementById('delivery-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const addr = {};
    ['name','street','complement','city','postal','country'].forEach(k => {
      addr[k] = document.getElementById(`addr-${k}`)?.value.trim() || '';
    });
    if (!addr.name || !addr.street || !addr.city || !addr.postal) {
      showToast('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }
    localStorage.setItem(ADDR_KEY, JSON.stringify(addr));
    deductStock();
    clearCart();
    showConfirmation(addr);
  });
}

function showConfirmation(addr) {
  const orderId = 'MXB-' + Date.now().toString().slice(-6);
  document.getElementById('checkout-container').innerHTML = `
    <div class="order-confirmed">
      <div class="confirmed-icon">✅</div>
      <h2>Commande confirmée !</h2>
      <p class="confirmed-ref">Commande n° <strong>${orderId}</strong></p>
      <div class="confirmed-addr">
        <h4>📦 Livraison à :</h4>
        <p>${addr.name}<br>${addr.street}${addr.complement ? '<br>'+addr.complement : ''}<br>${addr.postal} ${addr.city}<br>${addr.country}</p>
      </div>
      <p class="confirmed-msg">Merci pour votre achat insolite ! 🎉</p>
      <a href="index.html" class="btn btn--primary">Retour au catalogue</a>
    </div>`;
}

init();
