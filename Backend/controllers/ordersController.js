// =========================================================
// MAXIBAZARD — Contrôleur Commandes
// =========================================================
const db = require('../config/db');

function getSessionId(req) {
  return req.headers['x-session-id'] || null;
}

// ── GET /api/orders ───────────────────────────────────────
exports.getOrders = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  try {
    const [orders] = await db.query(
      'SELECT * FROM commandes WHERE session_id = ? ORDER BY created_at DESC',
      [sessionId]
    );

    // Détails de chaque commande
    for (const order of orders) {
      const [items] = await db.query(`
        SELECT
          ci.*,
          o.nom         AS productNom,
          c.Name        AS couleurNom,
          t.Name        AS tailleNom,
          (SELECT img.Chemin_Img FROM images_objet img WHERE img.Id_Couleurs = ci.couleur_id AND img.Is_Main = 1 LIMIT 1) AS image
        FROM commande_items ci
        JOIN objects       o ON o.id = ci.object_id
        JOIN couleur_objet c ON c.id = ci.couleur_id
        JOIN taille_objets t ON t.id = ci.taille_id
        WHERE ci.commande_id = ?
      `, [order.id]);
      order.items = items;
    }

    res.json({ success: true, data: orders });
  } catch (err) {
    console.error('getOrders:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── POST /api/orders ──────────────────────────────────────
// body : { address: { fullName, street, complement, city, postalCode, country }, saveAddress: bool }
exports.placeOrder = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  const { address, saveAddress = false } = req.body;
  if (!address?.fullName || !address?.street || !address?.city || !address?.postalCode) {
    return res.status(400).json({ success: false, message: 'Adresse incomplète' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Récupérer le panier
    const [cartItems] = await conn.query(`
      SELECT p.id AS panier_id, p.object_id, p.couleur_id, p.taille_id, p.quantite,
             o.prix, o.reduction, t.Quantity AS stock, t.Name AS tailleNom
      FROM panier p
      JOIN objects       o ON o.id = p.object_id
      JOIN taille_objets t ON t.id = p.taille_id
      WHERE p.session_id = ?
    `, [sessionId]);

    if (!cartItems.length) {
      await conn.rollback();
      return res.status(400).json({ success: false, message: 'Le panier est vide' });
    }

    // 2. Vérifier le stock de chaque article
    for (const item of cartItems) {
      if (item.quantite > item.stock) {
        await conn.rollback();
        return res.status(409).json({
          success: false,
          message: `Stock insuffisant pour la taille "${item.tailleNom}" (dispo: ${item.stock})`
        });
      }
    }

    // 3. Calculer le total
    const total = cartItems.reduce((sum, item) => {
      const unitPrice = item.prix * (1 - item.reduction / 100);
      return sum + unitPrice * item.quantite;
    }, 0);

    // 4. Sauvegarder l'adresse si demandé
    let addressId = null;
    if (saveAddress) {
      const [addrResult] = await conn.query(`
        INSERT INTO adresses (session_id, full_name, street, complement, city, postal_code, country)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [sessionId, address.fullName, address.street, address.complement || null,
          address.city, address.postalCode, address.country || 'France']);
      addressId = addrResult.insertId;
    }

    // 5. Créer la commande
    const orderId = 'MXB-' + Date.now().toString().slice(-6);
    const [orderResult] = await conn.query(`
      INSERT INTO commandes (session_id, order_ref, total, address_id, full_name, street, complement, city, postal_code, country, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
    `, [sessionId, orderId, total.toFixed(2), addressId,
        address.fullName, address.street, address.complement || null,
        address.city, address.postalCode, address.country || 'France']);

    const commandeId = orderResult.insertId;

    // 6. Insérer les items de commande + déduire le stock
    for (const item of cartItems) {
      const unitPrice = item.prix * (1 - item.reduction / 100);
      await conn.query(`
        INSERT INTO commande_items (commande_id, object_id, couleur_id, taille_id, quantite, prix_unitaire)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [commandeId, item.object_id, item.couleur_id, item.taille_id, item.quantite, unitPrice.toFixed(2)]);

      await conn.query(
        'UPDATE taille_objets SET Quantity = GREATEST(0, Quantity - ?) WHERE id = ?',
        [item.quantite, item.taille_id]
      );
    }

    // 7. Vider le panier
    await conn.query('DELETE FROM panier WHERE session_id = ?', [sessionId]);

    await conn.commit();
    res.status(201).json({
      success: true,
      message: 'Commande confirmée !',
      orderId,
      total: total.toFixed(2)
    });

  } catch (err) {
    await conn.rollback();
    console.error('placeOrder:', err);
    res.status(500).json({ success: false, message: 'Erreur lors de la commande', error: err.message });
  } finally {
    conn.release();
  }
};

// ── GET /api/addresses ────────────────────────────────────
exports.getAddresses = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  try {
    const [rows] = await db.query(
      'SELECT * FROM adresses WHERE session_id = ? ORDER BY id DESC',
      [sessionId]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getAddresses:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── POST /api/addresses ───────────────────────────────────
exports.saveAddress = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  const { fullName, street, complement, city, postalCode, country = 'France' } = req.body;
  if (!fullName || !street || !city || !postalCode) {
    return res.status(400).json({ success: false, message: 'Champs obligatoires manquants' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO adresses (session_id, full_name, street, complement, city, postal_code, country) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [sessionId, fullName, street, complement || null, city, postalCode, country]
    );
    res.status(201).json({ success: true, id: result.insertId, message: 'Adresse sauvegardée' });
  } catch (err) {
    console.error('saveAddress:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// ── DELETE /api/addresses/:id ─────────────────────────────
exports.deleteAddress = async (req, res) => {
  const sessionId = getSessionId(req);
  if (!sessionId) return res.status(400).json({ success: false, message: 'session_id requis' });

  try {
    const [result] = await db.query(
      'DELETE FROM adresses WHERE id = ? AND session_id = ?',
      [req.params.id, sessionId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Adresse introuvable' });
    res.json({ success: true, message: 'Adresse supprimée' });
  } catch (err) {
    console.error('deleteAddress:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};
