const db = require('../config/db');

// --- 1. LOGIQUE POUR LE STOCK ---
exports.updateStock = async (req, res) => {
    const { id_objet, nom_taille, quantite_achetee } = req.body;

    // 1. Validation des données
    if (!id_objet || !nom_taille || quantite_achetee === undefined) {
        return res.status(400).json({ error: "Données manquantes pour la mise à jour du stock." });
    }

    console.log(`--> [STOCK] Mise à jour : Produit ${id_objet}, Taille ${nom_taille}, Quantité -${quantite_achetee}`);

    try {
        const sql = `
            UPDATE taille_objets 
            SET Quantity = Quantity - ? 
            WHERE Id_Objets = ? AND Name = ? AND Quantity >= ?
        `;

        // 2. Exécution avec await (spécifique à mysql2/promise)
        const [result] = await db.query(sql, [
            quantite_achetee, 
            id_objet, 
            nom_taille, 
            quantite_achetee
        ]);

        // 3. Vérification si une ligne a été modifiée
        if (result.affectedRows === 0) {
            return res.status(400).json({ 
                error: "Stock insuffisant ou variante introuvable." 
            });
        }

        console.log("--> [STOCK] ✅ Succès");
        res.json({ message: "Stock mis à jour avec succès !" });

    } catch (error) {
        console.error("❌ Erreur SQL lors de l'update stock :", error.message);
        res.status(500).json({ error: "Erreur serveur lors de la mise à jour du stock" });
    }
};

// --- 2. LOGIQUE POUR TOUS LES OBJETS ---
exports.getObjects = (req, res) => {
    const sql = `
        SELECT o.*, ANY_VALUE(i.Chemin_Img) as Chemin_Img 
        FROM objects o
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleurs
        GROUP BY o.ID`; 

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ objects: results });
    });
};

// --- 3. LOGIQUE POUR UN OBJET PAR ID ---
exports.getObjById = (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT o.*, c.nom_couleur as ColorName, i.chemin_img, t.nom_taille as SizeName, t.stock as Quantity
        FROM objects o
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objet
        LEFT JOIN images_objet i ON c.Id_Couleur = i.Id_Couleur
        LEFT JOIN taille_objets t ON o.ID = t.Id_Objet
        WHERE o.ID = ?`; 

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Not found' });

        const baseInfo = results[0];
        const colors = [...new Set(results.map(r => r.ColorName))].filter(Boolean);
        const images = [...new Set(results.map(r => r.chemin_img))].filter(Boolean);
        const sizes = [...new Set(results.map(r => JSON.stringify({nom: r.SizeName, stock: r.Quantity})))]
                        .map(s => JSON.parse(s)).filter(s => s.nom);

        res.status(200).json({
            Obj: {
                ID: baseInfo.ID,
                Nom: baseInfo.nom,
                Prix: baseInfo.prix,
                Variantes: { Couleurs: colors, Images: images, Tailles: sizes }
            }
        });
    });
};