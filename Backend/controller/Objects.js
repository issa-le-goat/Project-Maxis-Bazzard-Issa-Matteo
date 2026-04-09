const db = require('../config/db'); // On importe la connexion

exports.getObjects = (req, res) => {
    // La requête SQL pour tout récupérer
    const sql = "SELECT * FROM `objects`"; 

    db.query(sql, (err, results) => {
        if (err) {
            // En cas d'erreur SQL (table inexistante, faute de frappe...)
            return res.status(500).json({ 
                code: 500, 
                message: "Erreur lors de la récupération", 
                error: err 
            });
        }

        // 'results' est un tableau contenant toutes vos lignes SQL
        res.status(200).json({
            code: 200,
            message: 'Données récupérées avec succès depuis MySQL',
            sneakers: results
        });
    });
}

exports.getObjById = (req, res) => {
    const id = req.params.id;
    
    const sql = "SELECT * FROM `objects` WHERE id = ?"; 

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ 
                code: 500, 
                message: "Erreur lors de la recherche", 
                error: err 
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'Object not found'
            });
        }

        res.status(200).json({
            code: 200,
            message: 'Object retrieved successfully',
            Obj: results[0]
        });
    });
};