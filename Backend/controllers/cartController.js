// =========================================================
// MAXIBAZARD — Contrôleur Panier (table : panier)
// Utilise un session_id côté client (localStorage → header)
// =========================================================
const db = require('../config/db');

// Helper : récupère ou génère le session_id depuis le header
function getSessionId(req) {
  return req.headers['x-session-id'] || null;
}

// ── GET /api/cart ─────────────────────────────────────────
exports.getCart = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis (header X-Session-ID)' });

  try {
    const [rows] = await db.query(`
      SELECT
        p.id        AS panier_id,
        p.object_id AS productId,
        p.couleur_id,
        p.taille_id,
        p.quantite,
        o.nom       AS productNom,
        o.prix,
        o.reduction,
        c.Name      AS couleurNom,
        t.Name      AS tailleNom,
        t.Quantity  AS stock,
        (SELECT Chemin_Img FROM images_objet WHERE Id_Couleurs = p.couleur_id AND Is_Main = 1 LIMIT 1) AS productImage
      FROM panier p
      JOIN objects        o ON o.id = p.object_id
      JOIN couleur_objet  c ON c.id = p.couleur_id
      JOIN taille_objets  t ON t.id = p.taille_id
      WHERE p.session_id = ?
      ORDER BY p.id
    `, [sessionId]);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getCart:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── POST /api/cart ────────────────────────────────────────
// body : { productId, couleurId, tailleId, quantity }
exports.addToCart = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  const { productId, couleurId, tailleId, quantity = 1 } = req.body;
  if (!productId || !couleurId || !tailleId) {
    return res.status(400).json({ success: false, message: 'productId, couleurId, tailleId requis' });
  }

  try {
    // Vérif stock disponible
    const [[taille]] = await db.query('SELECT Quantity FROM taille_objets WHERE id = ?', [tailleId]);
    if (!taille) return res.status(404).json({ success: false, message: 'Taille introuvable' });

    // Quantité déjà en panier
    const [[existing]] = await db.query(
      'SELECT id, quantite FROM panier WHERE session_id = ? AND object_id = ? AND couleur_id = ? AND taille_id = ?',
      [sessionId, productId, couleurId, tailleId]
    );
    const alreadyInCart = existing ? existing.quantite : 0;

    if (alreadyInCart + quantity > taille.Quantity) {
      return res.status(409).json({
        success: false,
        message: `Stock insuffisant. Disponible : ${Math.max(0, taille.Quantity - alreadyInCart)}`
      });
    }

    if (existing) {
      await db.query(
        'UPDATE panier SET quantite = quantite + ? WHERE id = ?',
        [quantity, existing.id]
      );
    } else {
      await db.query(
        'INSERT INTO panier (session_id, object_id, couleur_id, taille_id, quantite) VALUES (?, ?, ?, ?, ?)',
        [sessionId, productId, couleurId, tailleId, quantity]
      );
    }

    res.json({ success: true, message: 'Produit ajouté au panier !' });
  } catch (err) {
    console.error('addToCart:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── PATCH /api/cart/:panierItemId ─────────────────────────
// body : { quantity }
exports.updateCartItem = async (req, res) => {
  const sessionId = getSessionId(req);
  const { panierItemId } = req.params;
  const { quantity } = req.body;

  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });
  if (!quantity || quantity < 1) return res.status(400).json({ success: false, message: 'Quantité invalide' });

  try {
    const [[item]] = await db.query(
      'SELECT p.id, p.taille_id, t.Quantity AS stock FROM panier p JOIN taille_objets t ON t.id = p.taille_id WHERE p.id = ? AND p.session_id = ?',
      [panierItemId, sessionId]
    );
    if (!item) return res.status(404).json({ success: false, message: 'Article introuvable' });

    if (quantity > item.stock) {
      return res.status(409).json({ success: false, message: `Stock insuffisant (${item.stock} dispo)` });
    }

    await db.query('UPDATE panier SET quantite = ? WHERE id = ?', [quantity, panierItemId]);
    res.json({ success: true, message: 'Quantité mise à jour' });
  } catch (err) {
    console.error('updateCartItem:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── DELETE /api/cart/:panierItemId ────────────────────────
exports.removeCartItem = async (req, res) => {
  const sessionId = getSessionId(req);
  const { panierItemId } = req.params;
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  try {
    const [result] = await db.query(
      'DELETE FROM panier WHERE id = ? AND session_id = ?',
      [panierItemId, sessionId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Article introuvable' });
    res.json({ success: true, message: 'Article supprimé du panier' });
  } catch (err) {
    console.error('removeCartItem:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── DELETE /api/cart ──────────────────────────────────────
exports.clearCart = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  try {
    await db.query('DELETE FROM panier WHERE session_id = ?', [sessionId]);
    res.json({ success: true, message: 'Panier vidé' });
  } catch (err) {
    console.error('clearCart:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};
