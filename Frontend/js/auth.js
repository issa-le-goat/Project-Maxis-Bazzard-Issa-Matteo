import { authAPI, setCurrentUser, getCurrentUser } from './api.js';

const loginForm = document.getElementById('login-form');

if (loginForm) {
  
    // Si déjà connecté, on va à l'accueil
    if (getCurrentUser()) window.location.href = 'index.html';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nom = document.getElementById('login-nom').value.trim();
        const code = document.getElementById('login-code').value.trim();
        const btn = document.getElementById('login-btn');

        btn.disabled = true; // Empêche le double clic

        try {
            const data = await authAPI.login(nom, code);
            
            // On enregistre l'utilisateur dans le localStorage
            setCurrentUser(data.user); 
            
            alert('Connexion réussie !');
            window.location.href = 'index.html';
        } catch (err) {
            alert(err.message);
            btn.disabled = false;
        }
    });
}

const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nom = document.getElementById('signup-nom').value.trim();
        const code = document.getElementById('signup-code').value.trim();
        const btn = document.getElementById('signup-btn');

        btn.disabled = true;

        try {
            const data = await authAPI.signup(nom, code);
            alert("Compte créé ! Vous pouvez maintenant vous connecter.");
            
            // On redirige vers la page de connexion
            window.location.href = 'login.html';
        } catch (err) {
            alert(err.message);
            btn.disabled = false;
        }
    });
}