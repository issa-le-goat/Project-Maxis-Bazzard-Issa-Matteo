// =========================================================
// MAXIBAZARD — Client API (Frontend → Backend Express)
// Deux systèmes :
//   - /user/* → UserRouter (signup, login, favoris, panier par user_id)
//   - /api/*  → routes/api.js (session_id based)
// =========================================================

const API_BASE  = 'http://localhost:3306/api';
const USER_BASE = 'http://localhost:3306/user';

// ── Session ID anonyme ────────────────────────────────────
export function getSessionId() {
  let sid = localStorage.getItem('maxibazard_session');
  if (!sid) {
    sid = 'sid-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    localStorage.setItem('maxibazard_session', sid);
  }
  return sid;
}

// ── User ID connecté ──────────────────────────────────────
export function getCurrentUser() {
  const raw = localStorage.getItem('maxibazard_user');
  return raw ? JSON.parse(raw) : null;
}
export function setCurrentUser(user) {
  localStorage.setItem('maxibazard_user', JSON.stringify(user));
}
export function logout() {
  localStorage.removeItem('maxibazard_user');
  window.location.href = 'login.html';
}

// ── Fetch helper ──────────────────────────────────────────
async function apiFetch(base, path, options = {}) {
  const res = await fetch(base + path, {
    headers: { 'Content-Type': 'application/json', 'X-Session-ID': getSessionId(), ...options.headers },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Erreur API');
  return data;
}

// ── AUTH (UserRouter) ─────────────────────────────────────
export const authAPI = {
  signup: (nom, code) => apiFetch(USER_BASE, '/signup', {
    method: 'POST', body: JSON.stringify({ nom, code })
  }),
  login: (nom, code) => apiFetch(USER_BASE, '/login', {
    method: 'POST', body: JSON.stringify({ nom, code })
  })
};

// ── PRODUITS (/api/products) ──────────────────────────────
export const productsAPI = {
  getAll:    (params = {}) => apiFetch(API_BASE, '/products?' + new URLSearchParams(params)),
  getById:   (id)          => apiFetch(API_BASE, `/products/${id}`),
  getSimilar:(id)          => apiFetch(API_BASE, `/products/${id}/similar`),
  getGenres: ()            => apiFetch(API_BASE, '/products/genres'),
};

// ── PANIER SESSION (/api/cart) ────────────────────────────
export const cartAPI = {
  get:    ()                               => apiFetch(API_BASE, '/cart'),
  add:    (productId, couleurId, tailleId, quantity) =>
    apiFetch(API_BASE, '/cart', { method: 'POST', body: JSON.stringify({ productId, couleurId, tailleId, quantity }) }),
  update: (panierItemId, quantity)         =>
    apiFetch(API_BASE, `/cart/${panierItemId}`, { method: 'PATCH', body: JSON.stringify({ quantity }) }),
  remove: (panierItemId)                   =>
    apiFetch(API_BASE, `/cart/${panierItemId}`, { method: 'DELETE' }),
  clear:  ()                               =>
    apiFetch(API_BASE, '/cart', { method: 'DELETE' })
};

// ── FAVORIS SESSION (/api/favorites) ─────────────────────
export const favoritesAPI = {
  get:    ()          => apiFetch(API_BASE, '/favorites'),
  add:    (productId) => apiFetch(API_BASE, '/favorites', { method: 'POST', body: JSON.stringify({ productId }) }),
  remove: (productId) => apiFetch(API_BASE, `/favorites/${productId}`, { method: 'DELETE' })
};

// ── COMMANDES & ADRESSES (/api/orders, /api/addresses) ───
export const ordersAPI = {
  getAll: ()                      => apiFetch(API_BASE, '/orders'),
  place:  (address, saveAddress)  =>
    apiFetch(API_BASE, '/orders', { method: 'POST', body: JSON.stringify({ address, saveAddress }) })
};
export const addressesAPI = {
  getAll: ()    => apiFetch(API_BASE, '/addresses'),
  save:   (addr)=> apiFetch(API_BASE, '/addresses', { method: 'POST', body: JSON.stringify(addr) }),
  delete: (id)  => apiFetch(API_BASE, `/addresses/${id}`, { method: 'DELETE' })
};
