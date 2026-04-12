const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Autoriser le CORS
app.use(cors({ origin: '*' }));

app.use(express.json()); // Permet de lire le req.body

// --- VÉRIFICATION DES CHEMINS ---
const directoryToServe = path.join(__dirname, 'assets');
console.log("------------------------------------------");
console.log("Dossier cherché :", directoryToServe);
console.log("Le dossier existe-t-il ? :", fs.existsSync(directoryToServe));
console.log("------------------------------------------");

// Configuration du dossier statique
app.use('/assets', express.static(directoryToServe));

// Routes API
const objectRouter = require('./router/Object');
app.use('/api', objectRouter);

app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));