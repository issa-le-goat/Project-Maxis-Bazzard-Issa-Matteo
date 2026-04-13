const API_BASE  = 'http://localhost:3000/api';
const USER_BASE = 'http://localhost:3000/user';

export function getSessionId() {
  let sid = localStorage.getItem('maxibazard_session');
  if (!sid) {
    sid = 'sid-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    localStorage.setItem('maxibazard_session', sid);
  }
  return sid;
}


export function logout() {
  // 1. On supprime l'utilisateur du stockage local
  localStorage.removeItem('maxibazard_user');
  
  // 2. On renvoie l'utilisateur vers la page de login
  window.location.href = 'login.html';
}


// --- GESTION LOCALE DE L'USER ---
export function getCurrentUser() {
  const raw = localStorage.getItem('maxibazard_user');
  try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}

export function setCurrentUser(user) {
  if (user) localStorage.setItem('maxibazard_user', JSON.stringify(user));
}

// --- HELPER FETCH ---
async function apiFetch(base, path, options = {}) {
  const res = await fetch(base + path, {
    headers: { 'Content-Type': 'application/json', 'X-Session-ID': getSessionId(), ...options.headers },
    ...options
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Erreur API');
  return data;
}

export const authAPI = {
  signup: (nom, code) => apiFetch(USER_BASE, '/signup', {
    method: 'POST', body: JSON.stringify({ nom, code })
  }),
  login: (nom, code) => apiFetch(USER_BASE, '/login', {
    method: 'POST', body: JSON.stringify({ nom, code })
  })
};

