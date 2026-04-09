// =========================================================
// MAXIBAZARD — Page Commande / Livraison
// =========================================================
import { products } from './data.js';
import { getCart, clearCart, getCartTotal, deductStock, updateCartBadge } from './utils/cart.js';
import { formatPrice, getFinalPrice, showToast } from './utils/helpers.js';

const ADDR_KEY = 'maxibazard_address';

function init() {
  updateCartBadge();
  document.getElementById('fav-count').textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;

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

// ── RÉCAPITULATIF ─────────────────────────────────────────
function renderOrderSummary(cart) {
  const container = document.getElementById('order-summary');
  let html = '<h3>Récapitulatif</h3><div class="summary-items">';

  let total = 0;
  cart.forEach(item => {
    const unitPrice = getFinalPrice(item.price, item.discount);
    const lineTotal = unitPrice * item.quantity;
    total += lineTotal;
    html += `
      <div class="summary-item">
        <img src="${item.productImage}" alt="${item.productName}" class="summary-thumb">
        <div class="summary-item-info">
          <span class="summary-item-name">${item.productName}</span>
          <span class="summary-item-opts">${item.selectedColor} · ${item.selectedSize} · ×${item.quantity}</span>
        </div>
        <span class="summary-item-price">${formatPrice(lineTotal, item.currency)}</span>
      </div>`;
  });

  html += `</div>
    <div class="summary-totals">
      <div class="summary-line"><span>Sous-total</span><span>${formatPrice(total, '€')}</span></div>
      <div class="summary-line"><span>Livraison</span><span class="text-success">Gratuite</span></div>
      <div class="summary-line summary-line--total"><span>Total TTC</span><span>${formatPrice(total, '€')}</span></div>
    </div>`;

  container.innerHTML = html;
}

// ── CHARGEMENT ADRESSE SAUVEGARDÉE ───────────────────────
function loadSavedAddress() {
  const saved = JSON.parse(localStorage.getItem(ADDR_KEY) || 'null');
  if (!saved) return;

  document.getElementById('addr-name').value       = saved.fullName    || '';
  document.getElementById('addr-street').value     = saved.street      || '';
  document.getElementById('addr-complement').value = saved.complement  || '';
  document.getElementById('addr-city').value       = saved.city        || '';
  document.getElementById('addr-postal').value     = saved.postalCode  || '';
  document.getElementById('addr-country').value    = saved.country     || 'France';

  document.getElementById('saved-addr-banner').innerHTML = `
    <div class="saved-addr-notice">
      <strong>📍 Adresse sauvegardée :</strong>
      ${saved.fullName}, ${saved.street}${saved.complement ? ' ' + saved.complement : ''}, ${saved.postalCode} ${saved.city}, ${saved.country}
    </div>`;
}

// ── FORMULAIRE ────────────────────────────────────────────
function bindForm() {
  const form = document.getElementById('delivery-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();

    const address = {
      fullName:    document.getElementById('addr-name').value.trim(),
      street:      document.getElementById('addr-street').value.trim(),
      complement:  document.getElementById('addr-complement').value.trim(),
      city:        document.getElementById('addr-city').value.trim(),
      postalCode:  document.getElementById('addr-postal').value.trim(),
      country:     document.getElementById('addr-country').value.trim(),
    };

    // Validation basique
    if (!address.fullName || !address.street || !address.city || !address.postalCode) {
      showToast('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    // Sauvegarde de l'adresse
    localStorage.setItem(ADDR_KEY, JSON.stringify(address));

    // Déduction du stock
    deductStock(products);

    // Vidage du panier
    clearCart();

    // Confirmation
    showConfirmation(address);
  });
}

// ── PAGE DE CONFIRMATION ──────────────────────────────────
function showConfirmation(address) {
  const orderId = 'MXB-' + Date.now().toString().slice(-6);
  document.getElementById('checkout-container').innerHTML = `
    <div class="order-confirmed">
      <div class="confirmed-icon">✅</div>
      <h2>Commande confirmée !</h2>
      <p class="confirmed-ref">Numéro de commande : <strong>${orderId}</strong></p>
      <div class="confirmed-addr">
        <h4>📦 Livraison prévue à :</h4>
        <p>${address.fullName}<br>
           ${address.street}${address.complement ? '<br>' + address.complement : ''}<br>
           ${address.postalCode} ${address.city}<br>
           ${address.country}</p>
      </div>
      <p class="confirmed-msg">Un email de confirmation vous sera envoyé. Merci pour votre achat insolite ! 🎉</p>
      <a href="index.html" class="btn btn--primary">Retour au catalogue</a>
    </div>`;
}

init();
