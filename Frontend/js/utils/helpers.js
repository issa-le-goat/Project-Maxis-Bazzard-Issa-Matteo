// =========================================================
// MAXIBAZARD — Helpers partagés
// =========================================================

/** Calcule le prix final après remise */
export function getFinalPrice(price, discount) {
  return price * (1 - discount / 100);
}

/** Formate un prix avec devise */
export function formatPrice(amount, currency = '€') {
  return `${amount.toFixed(2)} ${currency}`;
}

/** Génère le HTML du bloc prix (avec ou sans promo) */
export function buildPriceHTML(product) {
  const final = getFinalPrice(product.price, product.discount);
  if (product.discount > 0) {
    return `
      <span class="price-old">${formatPrice(product.price, product.currency)}</span>
      <span class="price-new">${formatPrice(final, product.currency)}</span>
      <span class="badge-promo">-${product.discount}%</span>
    `;
  }
  return `<span class="price-normal">${formatPrice(product.price, product.currency)}</span>`;
}

/** Tronque un texte à n caractères */
export function truncate(text, n = 150) {
  return text.length > n ? text.substring(0, n) + '…' : text;
}

/** Récupère l'ID produit depuis l'URL */
export function getProductIdFromUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

/** Affiche un toast de notification */
export function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('toast--visible'), 10);
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
