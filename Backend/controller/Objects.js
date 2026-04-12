const db = require('../config/db'); // On importe la connexion

exports.getObjects = (req, res) => {
    const sql = `
        SELECT 
            o.*, 
            ANY_VALUE(i.Chemin_Img) as Chemin_Img 
        FROM objects o
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleurs
        WHERE i.Is_Main = 1 OR i.Is_Main IS NULL
        GROUP BY o.ID`; 

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ code: 500, message: "Erreur SQL", error: err });
        }
        res.status(200).json({
            code: 200,
            message: 'Données récupérées avec succès',
            objects: results
        });
    });
}

exports.getObjById = (req, res) => {
    const id = req.params.id;
    
    // On remet la vraie requête SQL ici
    const sql = `
        SELECT 
            o.*, 
            c.Name as ColorName, 
            i.Chemin_Img, 
            i.Is_Main,
            t.Name as SizeName, 
            t.Quantity
        FROM objects o
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleurs
        LEFT JOIN taille_objets t ON (c.ID = t.Id_Couleurs)
        WHERE o.ID = ?`; 

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ 
                code: 500, 
                message: "Erreur SQL", 
                error: err 
            });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ 
                code: 404, 
                message: 'Object not found' 
            });
        }

        // --- Logique de restructuration pour éviter les 8 lignes répétitives ---
        
        // 1. On récupère les infos de base (communes à toutes les lignes)
        const baseInfo = results[0];

        // 2. On extrait les données uniques pour les tableaux
        // On utilise JSON.stringify pour comparer les objets dans les Sets
        const colors = [...new Set(results.map(r => r.ColorName))].filter(Boolean);
        const images = [...new Set(results.map(r => r.Chemin_Img))].filter(Boolean);
        
        // Pour les tailles, on crée une liste unique (clé Nom + Quantité)
        const sizesMap = {};
        results.forEach(r => {
            if (r.SizeName) {
                sizesMap[r.SizeName] = r.Quantity;
            }
        });
        const sizes = Object.keys(sizesMap).map(name => ({
            nom: name,
            stock: sizesMap[name]
        }));

        const formattedObj = {
            ID: baseInfo.ID,
            Nom: baseInfo.Nom,
            Prix: baseInfo.Prix,
            Reduc: baseInfo.Reduc,
            Genre: baseInfo.Genre,
            Des: baseInfo.Des,
            Variantes: {
                Couleurs: colors,
                Images: images,
                Tailles: sizes
            }
        };

        res.status(200).json({
            code: 200,
            message: 'Object retrieved and formatted successfully',
            Obj: formattedObj
        });
    });
};

exports.getObjectsByPrice = (req, res) => {
    // On récupère le prix max depuis les paramètres de l'URL (ex: /ObjectsByPrice/20)
    const prixMax = req.params.price;

    const sql = `
        SELECT 
            o.*, 
            ANY_VALUE(i.Chemin_Img) as Chemin_Img 
        FROM objects o
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleurs
        WHERE (o.Prix <= ?) AND (i.Is_Main = 1 OR i.Is_Main IS NULL)
        GROUP BY o.ID
        ORDER BY o.Prix ASC`; // On trie du moins cher au plus cher

    db.query(sql, [prixMax], (err, results) => {
        if (err) {
            return res.status(500).json({ 
                code: 500, 
                message: "Erreur lors du filtrage par prix", 
                error: err 
            });
        }

        res.status(200).json({
            code: 200,
            message: `Produits trouvés pour un budget max de ${prixMax}€`,
            count: results.length,
            objects: results
        });
    });
};

exports.getObjectsByGenre = (req, res) => {
    // On récupère le genre depuis l'URL (ex: /ObjectsByGenre/Cuisine)
    const genre = req.params.genre;

    const sql = `
        SELECT 
            o.*, 
            ANY_VALUE(i.Chemin_Img) as Chemin_Img 
        FROM objects o
        LEFT JOIN couleur_objet c ON o.ID = c.Id_Objets
        LEFT JOIN images_objet i ON c.ID = i.Id_Couleurs
        WHERE o.Genre = ? AND (i.Is_Main = 1 OR i.Is_Main IS NULL)
        GROUP BY o.ID`;

    db.query(sql, [genre], (err, results) => {
        if (err) {
            return res.status(500).json({ 
                code: 500, 
                message: "Erreur lors du filtrage par genre", 
                error: err 
            });
        }

        res.status(200).json({
            code: 200,
            message: `Produits de la catégorie ${genre} récupérés`,
            count: results.length,
            objects: results
        });
    });
};