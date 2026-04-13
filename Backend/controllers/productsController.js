// =========================================================
// MAXIBAZARD — Contrôleur Produits
// Schéma : objects → couleur_objet → images_objet + taille_objets
// =========================================================
const db = require('../config/db');

// ── Requête de base : produit avec toutes ses couleurs, images, tailles ──
const FULL_PRODUCT_SQL = `
  SELECT
    o.id           AS objet_id,
    o.nom          AS objet_nom,
    o.prix,
    o.reduction,
    o.genre,
    o.Des          AS description,

    c.id           AS couleur_id,
    c.Name         AS couleur_nom,

    img.Chemin_Img AS img_chemin,
    img.Is_Main    AS img_is_main,

    t.id           AS taille_id,
    t.Name         AS taille_nom,
    t.Quantity     AS taille_stock

  FROM objects o
  LEFT JOIN couleur_objet c   ON c.Id_Objets   = o.id
  LEFT JOIN images_objet  img ON img.Id_Couleurs = c.id
  LEFT JOIN taille_objets t   ON t.Id_Objets    = o.id
                              AND t.Id_Couleurs  = c.id
  ORDER BY o.id, c.id, img.Is_Main DESC, t.id
`;

/**
 * Transforme les lignes plates SQL en objets structurés :
 * [{ id, nom, prix, ..., couleurs: [{ id, nom, images: [...], tailles: [...] }] }]
 */
function formatProducts(rows) {
  const productsMap = new Map();

  rows.forEach(row => {
    // ── Produit ──────────────────────────────────────────
    if (!productsMap.has(row.objet_id)) {
      productsMap.set(row.objet_id, {
        id:          row.objet_id,
        nom:         row.objet_nom,
        prix:        parseFloat(row.prix),
        reduction:   row.reduction,
        genre:       row.genre,
        description: row.description,
        couleurs:    []
      });
    }
    const product = productsMap.get(row.objet_id);

    if (!row.couleur_id) return;   // pas de couleur associée

    // ── Couleur ───────────────────────────────────────────
    let couleur = product.couleurs.find(c => c.id === row.couleur_id);
    if (!couleur) {
      couleur = { id: row.couleur_id, nom: row.couleur_nom, images: [], tailles: [] };
      product.couleurs.push(couleur);
    }

    // ── Image ─────────────────────────────────────────────
    if (row.img_chemin && !couleur.images.find(i => i.chemin === row.img_chemin)) {
      couleur.images.push({ chemin: row.img_chemin, isMain: row.img_is_main === 1 });
    }

    // ── Taille ────────────────────────────────────────────
    if (row.taille_nom && !couleur.tailles.find(t => t.id === row.taille_id)) {
      couleur.tailles.push({
        id:    row.taille_id,
        nom:   row.taille_nom,
        stock: row.taille_stock
      });
    }
  });

  return Array.from(productsMap.values());
}

// ── GET /api/products ─────────────────────────────────────
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(FULL_PRODUCT_SQL);
    const products = formatProducts(rows);

    // Filtres optionnels via query params
    let result = products;
    const { genre, couleur, promo, sort } = req.query;

    if (genre)  result = result.filter(p => p.genre === genre);
    if (couleur) result = result.filter(p =>
      p.couleurs.some(c => c.nom.toLowerCase().includes(couleur.toLowerCase()))
    );
    if (promo === 'true') result = result.filter(p => p.reduction > 0);

    if (sort === 'asc')   result.sort((a, b) => a.prix * (1 - a.reduction/100) - b.prix * (1 - b.reduction/100));
    if (sort === 'desc')  result.sort((a, b) => b.prix * (1 - b.reduction/100) - a.prix * (1 - a.reduction/100));
    if (sort === 'promo') result.sort((a, b) => b.reduction - a.reduction);

    res.json({ success: true, count: result.length, data: result });
  } catch (err) {
    console.error('getAllProducts:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── GET /api/products/:id ─────────────────────────────────
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(FULL_PRODUCT_SQL + ' HAVING objet_id = ?', [id]);

    // Alternative propre si HAVING ne fonctionne pas sur cette requête :
    const allProducts = formatProducts(rows.length ? rows : []);
    // Refaire la requête ciblée
    const [rowsFiltered] = await db.query(
      FULL_PRODUCT_SQL.replace('ORDER BY', 'WHERE o.id = ? ORDER BY'),
      [id]
    );
    const products = formatProducts(rowsFiltered);

    if (!products.length) {
      return res.status(404).json({ success: false, message: 'Produit introuvable' });
    }

    res.json({ success: true, data: products[0] });
  } catch (err) {
    console.error('getProductById:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── GET /api/products/:id/similar ─────────────────────────
exports.getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupère le genre du produit cible
    const [[target]] = await db.query('SELECT genre FROM objects WHERE id = ?', [id]);
    if (!target) return res.status(404).json({ success: false, message: 'Produit introuvable' });

    const [rows] = await db.query(
      FULL_PRODUCT_SQL.replace('ORDER BY', 'WHERE o.genre = ? AND o.id != ? ORDER BY'),
      [target.genre, id]
    );
    const products = formatProducts(rows).slice(0, 4);

    res.json({ success: true, data: products });
  } catch (err) {
    console.error('getSimilarProducts:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── GET /api/genres ───────────────────────────────────────
exports.getGenres = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT DISTINCT genre FROM objects ORDER BY genre');
    res.json({ success: true, data: rows.map(r => r.genre) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── PATCH /api/products/stock ─────────────────────────────
// Déduit le stock après commande (body : [{ tailleId, quantity }])
exports.deductStock = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const items = req.body; // [{ tailleId, quantity }]

    for (const item of items) {
      const [[row]] = await conn.query(
        'SELECT Quantity FROM taille_objets WHERE id = ? FOR UPDATE', [item.tailleId]
      );
      if (!row) continue;
      const newStock = Math.max(0, row.Quantity - item.quantity);
      await conn.query('UPDATE taille_objets SET Quantity = ? WHERE id = ?', [newStock, item.tailleId]);
    }

    await conn.commit();
    res.json({ success: true, message: 'Stock mis à jour' });
  } catch (err) {
    await conn.rollback();
    console.error('deductStock:', err);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du stock', error: err.message });
  } finally {
    conn.release();
  }
};
