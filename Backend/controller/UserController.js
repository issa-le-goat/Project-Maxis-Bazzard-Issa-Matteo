const db = require('../config/db');
const bcrypt = require('bcrypt');

// --- 1. INSCRIPTION (SIGNUP) ---
exports.createUser = async (req, res) => {
    const { nom, code } = req.body;

    if (!nom || !code) {
        return res.status(400).json({ error: "Le nom et le code sont obligatoires." });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(code, saltRounds);

        const sql = "INSERT INTO users (nom, code) VALUES (?, ?)";

        db.query(sql, [nom, hashedPassword], (err, result) => {
            if (err) {
                console.error("Erreur SQL :", err);
                return res.status(500).json({ error: "Ce nom est peut-être déjà utilisé." });
            }
            res.status(201).json({ 
                message: "Compte créé !", 
                userId: result.insertId 
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du hachage." });
    }
};

// --- 2. CONNEXION (LOGIN) ---
exports.login = (req, res) => {
    const { nom, code } = req.body;

    if (!nom || !code) {
        return res.status(400).json({ error: "Nom et code requis." });
    }

    const sql = "SELECT * FROM users WHERE nom = ?";

    db.query(sql, [nom], async (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur SQL" });

        if (results.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé." });
        }

        const user = results[0];

        // Comparaison du mot de passe saisi avec le hash en base
        const isMatch = await bcrypt.compare(code, user.code);

        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        res.json({ 
            message: "Connexion réussie !", 
            user: { id: user.id, nom: user.nom } 
        });
    });
};

// --- AJOUTER AUX FAVORIS ---
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

// --- AJOUTER AU PANIER ---
exports.addToCart = (req, res) => {
    const { user_id, object_id, quantite } = req.body;

    if (!user_id || !object_id) {
        return res.status(400).json({ error: "Données manquantes pour le panier." });
    }

    // On utilise "ON DUPLICATE KEY UPDATE" pour augmenter la quantité si l'objet est déjà au panier
    const sql = `
        INSERT INTO panier (user_id, object_id, quantite) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantite = quantite + VALUES(quantite)`;

    db.query(sql, [user_id, object_id, quantite || 1], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de l'ajout au panier." });
        res.status(201).json({ message: "Produit ajouté au panier !" });
    });
};


// --- 1. INSCRIPTION (SIGNUP) ---
exports.createUser = async (req, res) => {
    const { nom, code } = req.body;

    if (!nom || !code) {
        return res.status(400).json({ error: "Le nom et le code sont obligatoires." });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(code, saltRounds);

        const sql = "INSERT INTO users (nom, code) VALUES (?, ?)";

        db.query(sql, [nom, hashedPassword], (err, result) => {
            if (err) {
                console.error("Erreur SQL :", err);
                return res.status(500).json({ error: "Ce nom est peut-être déjà utilisé." });
            }
            res.status(201).json({ 
                message: "Compte créé !", 
                userId: result.insertId 
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du hachage." });
    }
};

// --- 2. CONNEXION (LOGIN) ---
exports.login = (req, res) => {
    const { nom, code } = req.body;

    if (!nom || !code) {
        return res.status(400).json({ error: "Nom et code requis." });
    }

    const sql = "SELECT * FROM users WHERE nom = ?";

    db.query(sql, [nom], async (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur SQL" });

        if (results.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé." });
        }

        const user = results[0];

        // Comparaison du mot de passe saisi avec le hash en base
        const isMatch = await bcrypt.compare(code, user.code);

        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        res.json({ 
            message: "Connexion réussie !", 
            user: { id: user.id, nom: user.nom } 
        });
    });
};

exports.getFavorites = (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT o.*, ANY_VALUE(i.chemin_img) as chemin_img 
        FROM favoris f
        JOIN objects o ON f.object_id = o.ID
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleur
        WHERE f.user_id = ?
        GROUP BY o.ID
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur SQL lors de la récupération.", details: err.sqlMessage });
        }
        res.status(200).json({ favorites: results });
    });
};

// --- AJOUTER AU PANIER ---
exports.addToCart = (req, res) => {
    const { user_id, object_id, quantite } = req.body;

    if (!user_id || !object_id) {
        return res.status(400).json({ error: "Données manquantes pour le panier." });
    }

    // On utilise "ON DUPLICATE KEY UPDATE" pour augmenter la quantité si l'objet est déjà au panier
    const sql = `
        INSERT INTO panier (user_id, object_id, quantite) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantite = quantite + VALUES(quantite)`;

    db.query(sql, [user_id, object_id, quantite || 1], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de l'ajout au panier." });
        res.status(201).json({ message: "Produit ajouté au panier !" });
    });
};

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
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération.", details: err.sqlMessage });
        }
        res.status(200).json({ favorites: results });
    });
};

// --- RÉCUPÉRER LE PANIER D'UN UTILISATEUR ---
exports.getCart = (req, res) => {
    const userId = req.params.userId;

    // On sélectionne les infos de l'objet + la quantité dans la table panier
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

// --- SUPPRIMER UN FAVORIS ---
exports.removeFavorite = (req, res) => {
    const { user_id, object_id } = req.body;

    const sql = "DELETE FROM favoris WHERE user_id = ? AND object_id = ?";

    db.query(sql, [user_id, object_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la suppression du favori." });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Favori non trouvé." });
        res.json({ message: "Favori supprimé avec succès !" });
    });
};

// --- SUPPRIMER UN OBJET DU PANIER ---
exports.removeFromCart = (req, res) => {
    const { user_id, object_id } = req.body;

    const sql = "DELETE FROM panier WHERE user_id = ? AND object_id = ?";

    db.query(sql, [user_id, object_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la suppression du panier." });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Objet non trouvé dans le panier." });
        res.json({ message: "Objet retiré du panier !" });
    });
};

// Dans UserController.js
exports.updateCartQuantity = (req, res) => {
    const { user_id, object_id, quantite } = req.body;
    const sql = "UPDATE panier SET quantite = ? WHERE user_id = ? AND object_id = ?";
    
    db.query(sql, [quantite, user_id, object_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur MAJ quantité" });
        res.json({ message: "Quantité mise à jour !" });
    });
};

// Dans UserController.js
exports.clearCart = (req, res) => {
    const userId = req.params.userId;
    const sql = "DELETE FROM panier WHERE user_id = ?";
    
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors du vidage du panier" });
        res.json({ message: "Panier vidé !" });
    });
};