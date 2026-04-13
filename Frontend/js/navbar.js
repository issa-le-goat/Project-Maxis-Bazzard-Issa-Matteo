// =========================================================
// MAXIBAZARD — Gestion de la Barre de Navigation
// =========================================================

import { getCurrentUser, logout } from './api.js';
import { updateCartBadge } from './utils/cart.js';

/**
 * Met à jour dynamiquement les liens de la navbar.
 */
function updateNavbar() {
  const user = getCurrentUser();
  const navLinks = document.getElementById('nav-links');

  if (!navLinks) return;

  if (user) {
    // ÉTAT : CONNECTÉ
    // On affiche le nom de l'utilisateur et le bouton de déconnexion
    navLinks.innerHTML = `
      <a href="index.html" class="navbar__link">🛍️ Catalogue</a>
      <a href="favorites.html" class="navbar__link">❤️ Favoris</a>
      <a href="cart.html" class="navbar__link">
        🛒 Panier <span class="navbar__badge" id="cart-count">0</span>
      </a>
      <span class="navbar__user">👋 Salut, <strong>${user.nom}</strong></span>
      <button id="logout-btn" class="btn-logout" title="Se déconnecter">Déconnexion</button>
    `;

    // Attache l'événement de déconnexion
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', () => {
      if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
        logout();
      }
    });
  } else {
    // ÉTAT : NON CONNECTÉ
    // On affiche les liens par défaut et le bouton de connexion
    navLinks.innerHTML = `
      <a href="index.html" class="navbar__link">🛍️ Catalogue</a>
      <a href="cart.html" class="navbar__link">
        🛒 Panier <span class="navbar__badge" id="cart-count">0</span>
      </a>
      <a href="login.html" class="navbar__link navbar__link--auth">🔑 Connexion</a>
    `;
  }

  // Met à jour le badge du panier (nombre d'articles)
  updateCartBadge();
}

// Exécution immédiate au chargement du script
updateNavbar();