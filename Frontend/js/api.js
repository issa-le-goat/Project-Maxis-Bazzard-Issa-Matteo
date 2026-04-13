// =========================================================
// MAXIBAZARD — Client API (Frontend → Backend Express)
// =========================================================

const API_BASE = 'http://localhost:3000/api';

// ── Session ID (identifiant anonyme persistant) ───────────
function getSessionId() {
  let sid = localStorage.getItem('maxibazard_session');
  if (!sid) {
    sid = 'sid-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    localStorage.setItem('maxibazard_session', sid);
  }
  return sid;
}

// ── Headers communs ───────────────────────────────────────
function headers() {
  return {
    'Content-Type': 'application/json',
    'X-Session-ID': getSessionId()
  };
}

// ── Helper fetch ──────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: headers(),
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erreur API');
  return data;
}

// ── PRODUITS ──────────────────────────────────────────────
export const productsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch('/products' + (qs ? '?' + qs : ''));
  },
  getById: (id)      => apiFetch(`/products/${id}`),
  getSimilar: (id)   => apiFetch(`/products/${id}/similar`),
  getGenres: ()      => apiFetch('/products/genres'),
  deductStock: (items) => apiFetch('/products/stock', {
    method: 'PATCH',
    body: JSON.stringify(items)
  })
};

// ── PANIER ────────────────────────────────────────────────
export const cartAPI = {
  get: () => apiFetch('/cart'),
  add: (productId, couleurId, tailleId, quantity) =>
    apiFetch('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, couleurId, tailleId, quantity })
    }),
  update: (panierItemId, quantity) =>
    apiFetch(`/cart/${panierItemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity })
    }),
  remove: (panierItemId) =>
    apiFetch(`/cart/${panierItemId}`, { method: 'DELETE' }),
  clear: () =>
    apiFetch('/cart', { method: 'DELETE' })
};

// ── FAVORIS ───────────────────────────────────────────────
export const favoritesAPI = {
  get: ()          => apiFetch('/favorites'),
  add: (productId) => apiFetch('/favorites', {
    method: 'POST',
    body: JSON.stringify({ productId })
  }),
  remove: (productId) => apiFetch(`/favorites/${productId}`, { method: 'DELETE' })
};

// ── COMMANDES & ADRESSES ──────────────────────────────────
export const ordersAPI = {
  getAll: () => apiFetch('/orders'),
  place: (address, saveAddress = false) =>
    apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify({ address, saveAddress })
    })
};

export const addressesAPI = {
  getAll: () => apiFetch('/addresses'),
  save:   (addr) => apiFetch('/addresses', {
    method: 'POST',
    body: JSON.stringify(addr)
  }),
  delete: (id) => apiFetch(`/addresses/${id}`, { method: 'DELETE' })
};
