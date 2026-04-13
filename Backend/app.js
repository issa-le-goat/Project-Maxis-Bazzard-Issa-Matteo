// =========================================================
// MAXIBAZARD — Serveur Express
// =========================================================
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARES ───────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── FICHIERS STATIQUES ────────────────────────────────────
// Frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// Assets images (dossier séparé au même niveau que Backend/ et Frontend/)
// Accessible via : http://localhost:3306/assets/images/BeureCole/BeureColle_Doux_1.jpg
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// ── ROUTES API ────────────────────────────────────────────
app.use('/api',   require('./routes/api'));
app.use('/user',  require('./router/UserRouter'));   // signup, login, favoris, panier
app.use('/',      require('./router/Object'));        // /objects, /object/:id, /update-stock

// ── FALLBACK SPA ──────────────────────────────────────────
app.get(/^(?!\/(api|user|assets|objects|object|update-stock)).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

// ── DÉMARRAGE ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 MAXIBAZARD → http://localhost:${PORT}`);
  console.log(`   API produits  → http://localhost:${PORT}/api/products`);
  console.log(`   Auth          → http://localhost:${PORT}/user/login`);
  console.log(`   Images        → http://localhost:${PORT}/assets/images/\n`);
});
