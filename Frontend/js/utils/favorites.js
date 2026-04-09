// =========================================================
// MAXIBAZARD — Utilitaires Favoris (localStorage)
// =========================================================

const FAV_KEY = 'maxibazard_favorites';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
}

function saveFavorites(favs) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  updateFavBadge();
}

export function isFavorite(productId) {
  return getFavorites().includes(productId);
}

export function toggleFavorite(productId) {
  const favs = getFavorites();
  const idx = favs.indexOf(productId);
  if (idx === -1) {
    favs.push(productId);
    saveFavorites(favs);
    return true; // ajouté
  } else {
    favs.splice(idx, 1);
    saveFavorites(favs);
    return false; // supprimé
  }
}

export function removeFavorite(productId) {
  const favs = getFavorites().filter(id => id !== productId);
  saveFavorites(favs);
}

function updateFavBadge() {
  const badge = document.getElementById('fav-count');
  if (badge) badge.textContent = getFavorites().length;
}

export function getFavCount() {
  return getFavorites().length;
}
