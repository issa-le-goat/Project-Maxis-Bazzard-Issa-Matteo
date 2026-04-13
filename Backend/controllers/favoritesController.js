// =========================================================
// MAXIBAZARD — Contrôleur Favoris (table : favoris)
// =========================================================
const db = require('../config/db');

function getSessionId(req) {
  return req.headers['x-session-id'] || null;
}

// ── GET /api/favorites ────────────────────────────────────
exports.getFavorites = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  try {
    const [rows] = await db.query(`
      SELECT
        f.id       AS favori_id,
        o.id       AS objet_id,
        o.nom,
        o.prix,
        o.reduction,
        o.genre,
        (SELECT c.id FROM couleur_objet c WHERE c.Id_Objets = o.id ORDER BY c.id LIMIT 1) AS couleur_id,
        (SELECT img.Chemin_Img FROM images_objet img
          JOIN couleur_objet c2 ON c2.id = img.Id_Couleurs
          WHERE c2.Id_Objets = o.id AND img.Is_Main = 1 LIMIT 1) AS image_principale
      FROM favoris f
      JOIN objects o ON o.id = f.object_id
      WHERE f.session_id = ?
      ORDER BY f.id DESC
    `, [sessionId]);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getFavorites:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── POST /api/favorites ───────────────────────────────────
// body : { productId }
exports.addFavorite = async (req, res) => {
  const sessionId = getSessionId(req);
  const { productId } = req.body;
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });
  if (!productId) return res.status(400).json({ success: false, message: 'productId requis' });

  try {
    // Vérifie si déjà en favori
    const [[existing]] = await db.query(
      'SELECT id FROM favoris WHERE session_id = ? AND object_id = ?',
      [sessionId, productId]
    );
    if (existing) {
      return res.status(409).json({ success: false, message: 'Déjà dans les favoris' });
    }

    await db.query(
      'INSERT INTO favoris (session_id, object_id) VALUES (?, ?)',
      [sessionId, productId]
    );
    res.status(201).json({ success: true, message: 'Ajouté aux favoris' });
  } catch (err) {
    console.error('addFavorite:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── DELETE /api/favorites/:productId ─────────────────────
exports.removeFavorite = async (req, res) => {
  const sessionId  = getSessionId(req);
  const { productId } = req.params;
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  try {
    const [result] = await db.query(
      'DELETE FROM favoris WHERE session_id = ? AND object_id = ?',
      [sessionId, productId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Favori introuvable' });
    res.json({ success: true, message: 'Retiré des favoris' });
  } catch (err) {
    console.error('removeFavorite:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};
