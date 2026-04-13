const db = require('../config/db'); // Ton pool avec Promise
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => { // Ajout de async ici
    const { nom, code } = req.body;
    console.log("--> [STEP 1] Requête reçue pour :", nom);

    try {
        const sql = "SELECT * FROM users WHERE nom = ?";
        
        // Avec mysql2/promise, on utilise le destructuring [rows]
        const [rows] = await db.query(sql, [nom]); 
        
        console.log("--> [STEP 3] Résultat SQL :", rows.length, "utilisateur(s) trouvé(s)");

        if (rows.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé." });
        }

        const user = rows[0];
        console.log("--> [STEP 4] Comparaison du mot de passe...");

        const isMatch = await bcrypt.compare(code, user.code);
        console.log("--> [STEP 5] Résultat comparaison :", isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        console.log("--> [STEP 6] ✅ CONNEXION RÉUSSIE !");
        res.json({ 
            message: "Connexion réussie !", 
            user: { id: user.id, nom: user.nom } 
        });

    } catch (error) {
        console.error("--> [ERREUR FATALE] :", error.message);
        res.status(500).json({ error: "Erreur serveur interne" });
    }
};



// --- INSCRIPTION (SIGNUP) ---
exports.createUser = async (req, res) => { 
    const { nom, code } = req.body;
    
    console.log("--> [SIGNUP] Tentative de création pour :", nom);

    try {
        // 1. Hachage du mot de passe (Sécurité)
        const hashedPassword = await bcrypt.hash(code, 10); 
        
        // 2. Requête SQL avec await
        const sql = "INSERT INTO users (nom, code) VALUES (?, ?)";
        const [result] = await db.query(sql, [nom, hashedPassword]);

        console.log("--> [SIGNUP] ✅ Compte créé avec l'ID :", result.insertId);

        // 3. Réponse au client
        res.status(201).json({ 
            message: "Compte créé !", 
            user: { id: result.insertId, nom: nom } 
        });

    } catch (error) {
        // Gestion spécifique si le nom existe déjà
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Ce nom d'utilisateur est déjà pris." });
        }

        console.error("❌ Erreur Signup :", error.message);
        res.status(500).json({ error: "Erreur lors de la création du compte" });
    }
};

// --- 3. FAVORIS (GET, ADD, REMOVE) ---

exports.getFavorites = (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT o.*, ANY_VALUE(i.chemin_img) as chemin_img 
        FROM favoris f
        JOIN objects o ON f.object_id = o.ID
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleurs
        WHERE f.user_id = ?
        GROUP BY o.ID
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Erreur SQL Favoris :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération.", details: err.sqlMessage });
        }
        res.status(200).json({ favorites: results });
    });
};

exports.addFavorite = (req, res) => {
    const { user_id, object_id } = req.body;

    if (!user_id || !object_id) {
        return res.status(400).json({ error: "ID utilisateur et ID objet requis." });
    }

    const sql = "INSERT INTO favoris (user_id, object_id) VALUES (?, ?)";

    db.query(sql, [user_id, object_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de l'ajout aux favoris." });
        res.status(201).json({ message: "Produit ajouté aux favoris !" });
    });
};

exports.removeFavorite = (req, res) => {
    const { user_id, object_id } = req.body;
    const sql = "DELETE FROM favoris WHERE user_id = ? AND object_id = ?";

    db.query(sql, [user_id, object_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la suppression du favori." });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Favori non trouvé." });
        res.json({ message: "Favori supprimé avec succès !" });
    });
};

// --- 4. PANIER (GET, ADD, UPDATE, REMOVE, CLEAR) ---

exports.getCart = (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT o.*, f.quantite, ANY_VALUE(i.chemin_img) as chemin_img 
        FROM panier f
        JOIN objects o ON f.object_id = o.ID
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleurs
        WHERE f.user_id = ?
        GROUP BY o.ID
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Erreur SQL Panier :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération du panier.", details: err.sqlMessage });
        }
        res.status(200).json({ cart: results });
    });
};

exports.addToCart = (req, res) => {
    const { user_id, object_id, quantite } = req.body;

    if (!user_id || !object_id) {
        return res.status(400).json({ error: "Données manquantes pour le panier." });
    }

    const sql = `
        INSERT INTO panier (user_id, object_id, quantite) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantite = quantite + VALUES(quantite)`;

    db.query(sql, [user_id, object_id, quantite || 1], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de l'ajout au panier." });
        res.status(201).json({ message: "Produit ajouté au panier !" });
    });
};

exports.updateCartQuantity = (req, res) => {
    const { user_id, object_id, quantite } = req.body;
    const sql = "UPDATE panier SET quantite = ? WHERE user_id = ? AND object_id = ?";
    
    db.query(sql, [quantite, user_id, object_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur MAJ quantité" });
        res.json({ message: "Quantité mise à jour !" });
    });
};

exports.removeFromCart = (req, res) => {
    const { user_id, object_id } = req.body;
    const sql = "DELETE FROM panier WHERE user_id = ? AND object_id = ?";

    db.query(sql, [user_id, object_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la suppression du panier." });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Objet non trouvé dans le panier." });
        res.json({ message: "Objet retiré du panier !" });
    });
};

exports.clearCart = (req, res) => {
    const userId = req.params.userId;
    const sql = "DELETE FROM panier WHERE user_id = ?";
    
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors du vidage du panier" });
        res.json({ message: "Panier vidé !" });
    });
};