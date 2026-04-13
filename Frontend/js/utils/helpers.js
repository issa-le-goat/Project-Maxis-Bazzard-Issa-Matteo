// =========================================================
// MAXIBAZARD — Helpers partagés
// =========================================================

/** Formate un prix avec devise */
export function formatPrice(amount, currency = '€') {
  return `${amount.toFixed(2)} ${currency}`;
}

/** Génère le bloc HTML prix (promo ou normal) */
export function buildPriceHTML(product) {
  const final = product.prix * (1 - product.reduction / 100);
  if (product.reduction > 0) {
    return `
      <span class="price-old">${formatPrice(product.prix)}</span>
      <span class="price-new">${formatPrice(final)}</span>
      <span class="badge-promo">-${product.reduction}%</span>`;
  }
  return `<span class="price-normal">${formatPrice(product.prix)}</span>`;
}

/** Tronque un texte à n caractères */
export function truncate(text, n = 150) {
  return text.length > n ? text.substring(0, n) + '…' : text;
}

/** Récupère l'ID produit depuis l'URL (?id=X) */
export function getProductIdFromUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

/** Toast de notification */
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
  }, 2600);
}
