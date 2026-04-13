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

// Serveur les fichiers statiques du Frontend
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// ── ROUTES API ────────────────────────────────────────────
app.use('/api', require('./routes/api'));

// ── ROUTE FALLBACK (SPA) ──────────────────────────────────
// Toute route non-API renvoie index.html
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

// ── DÉMARRAGE ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 MAXIBAZARD démarré sur http://localhost:${PORT}`);
  console.log(`   API      → http://localhost:${PORT}/api/products`);
  console.log(`   Frontend → http://localhost:${PORT}/index.html\n`);
});
