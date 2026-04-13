// =========================================================
// MAXIBAZARD — Authentification (Login & Signup)
// =========================================================
import { authAPI, setCurrentUser, getCurrentUser } from './api.js';

// ─── HELPERS DOM ──────────────────────────────────────────
function showError(msg) {
  const el = document.getElementById('auth-error');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
  document.getElementById('auth-success')?.classList.remove('visible');
}
function showSuccess(msg) {
  const el = document.getElementById('auth-success');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
  document.getElementById('auth-error')?.classList.remove('visible');
}
function clearMessages() {
  document.getElementById('auth-error')?.classList.remove('visible');
  document.getElementById('auth-success')?.classList.remove('visible');
}
function setLoading(btn, loading) {
  btn.classList.toggle('loading', loading);
  btn.disabled = loading;
}

// ─── LOGIN ────────────────────────────────────────────────
const loginForm = document.getElementById('login-form');
if (loginForm) {
  // Redirige si déjà connecté
  if (getCurrentUser()) window.location.href = 'index.html';

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    const nom  = document.getElementById('login-nom').value.trim();
    const code = document.getElementById('login-code').value.trim();

    if (!nom || !code) { showError('Tous les champs sont obligatoires.'); return; }

    const btn = document.getElementById('login-btn');
    setLoading(btn, true);

    try {
      const data = await authAPI.login(nom, code);
      setCurrentUser(data.user);
      showSuccess('Connexion réussie ! Redirection…');
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    } catch (err) {
      showError(err.message || 'Identifiants incorrects.');
    } finally {
      setLoading(btn, false);
    }
  });
}

// ─── SIGNUP ───────────────────────────────────────────────
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    const nom     = document.getElementById('signup-nom').value.trim();
    const code    = document.getElementById('signup-code').value.trim();
    const confirm = document.getElementById('signup-confirm').value.trim();

    if (!nom || !code) { showError('Tous les champs sont obligatoires.'); return; }
    if (code.length < 6) { showError('Le mot de passe doit contenir au moins 6 caractères.'); return; }
    if (code !== confirm) { showError('Les mots de passe ne correspondent pas.'); return; }

    const btn = document.getElementById('signup-btn');
    setLoading(btn, true);

    try {
      await authAPI.signup(nom, code);
      showSuccess('Compte créé ! Redirection vers la connexion…');
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    } catch (err) {
      showError(err.message || 'Ce nom d\'utilisateur est peut-être déjà pris.');
    } finally {
      setLoading(btn, false);
    }
  });
}
