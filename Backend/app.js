require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();
// --- NE PAS OUBLIER CETTE LIGNE ---
const PORT = process.env.PORT || 3000; 

// 1. MIDDLEWARES
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. ROUTES API (Place-les ici avant les fichiers statiques)
app.use('/api',   require('./routes/api'));
app.use('/user',  require('./router/UserRouter'));
app.use('/',      require('./router/Object'));

// 3. FICHIERS STATIQUES
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// 4. FALLBACK SPA
app.get(/^(?!\/(api|user|assets|objects|object|update-stock)).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

// 5. DÉMARRAGE
app.listen(PORT, () => {
  console.log(`\n🚀 MAXIBAZARD → http://localhost:${PORT}`);
  console.log(`   Auth → http://localhost:${PORT}/user/login\n`);
});