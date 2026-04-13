// =========================================================
// MAXIBAZARD — Gestion navbar (user connecté / déconnecté)
// =========================================================
import { getCurrentUser, logout } from './api.js';
import { updateCartBadge } from './utils/cart.js';

export function initNavbar() {
  updateCartBadge();
  const favEl = document.getElementById('fav-count');
  if (favEl) favEl.textContent = JSON.parse(localStorage.getItem('maxibazard_favorites') || '[]').length;

  const loginLink = document.getElementById('nav-login');
  const user = getCurrentUser();

  if (loginLink && user) {
    loginLink.outerHTML = `
      <div class="navbar__user">
        <div class="navbar__user-avatar">${user.nom.charAt(0).toUpperCase()}</div>
        <span>${user.nom}</span>
        <button class="navbar__link" onclick="import('./js/api.js').then(m => m.logout())" 
                style="padding:4px 8px;font-size:.75rem;opacity:.7">Déco</button>
      </div>`;
  }

  // Burger mobile
  document.getElementById('burger-btn')?.addEventListener('click', function () {
    const links = document.getElementById('nav-links');
    const open  = links?.classList.toggle('is-open');
    this.setAttribute('aria-expanded', open);
  });
}

initNavbar();
