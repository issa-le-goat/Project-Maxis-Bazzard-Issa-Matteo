// =========================================================
// MAXIBAZARD — Panier (localStorage)
// Clé de panier : productId + couleurId + nomTaille
// =========================================================

const CART_KEY  = 'maxibazard_cart';
const STOCK_KEY = 'maxibazard_stock'; // surcharges de stock après achats

// ── LECTURE / ÉCRITURE ────────────────────────────────────

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// ── GESTION DU STOCK (surcharge locale) ──────────────────

export function getStockOverrides() {
  return JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
}

/**
 * Retourne le stock réel d'une taille donnée
 * @param {number} couleurId
 * @param {string} nomTaille
 * @param {number} stockOrigine
 */
export function getRealStock(couleurId, nomTaille, stockOrigine) {
  const overrides = getStockOverrides();
  const key = `${couleurId}::${nomTaille}`;
  return overrides[key] !== undefined ? overrides[key] : stockOrigine;
}

// ── AJOUT AU PANIER ───────────────────────────────────────

/**
 * @param {object} product   - objet produit complet
 * @param {object} couleur   - la couleur choisie (depuis product.couleurs)
 * @param {object} taille    - { nom, stock } de la taille choisie
 * @param {number} quantity
 */
export function addToCart(product, couleur, taille, quantity) {
  const cart    = getCart();
  const stock   = getRealStock(couleur.id, taille.nom, taille.stock);

  const existingItem = cart.find(i =>
    i.productId === product.id &&
    i.couleurId === couleur.id &&
    i.nomTaille === taille.nom
  );
  const alreadyInCart = existingItem ? existingItem.quantity : 0;

  if (alreadyInCart + quantity > stock) {
    return { success: false, message: `Stock insuffisant. Reste : ${Math.max(0, stock - alreadyInCart)}` };
  }

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId:    product.id,
      productNom:   product.nom,
      productImage: (couleur.images.find(i => i.isMain) || couleur.images[0])?.chemin || '',
      prix:         product.prix,
      reduction:    product.reduction,
      couleurId:    couleur.id,
      couleurNom:   couleur.nom,
      nomTaille:    taille.nom,
      stockOrigine: taille.stock,
      quantity
    });
  }

  saveCart(cart);
  return { success: true, message: 'Produit ajouté au panier !' };
}

// ── MODIFICATION ──────────────────────────────────────────

export function updateCartItem(productId, couleurId, nomTaille, newQty) {
  const cart = getCart();
  const item = cart.find(i =>
    i.productId === productId && i.couleurId === couleurId && i.nomTaille === nomTaille
  );
  if (!item) return;
  const stock = getRealStock(couleurId, nomTaille, item.stockOrigine);
  item.quantity = Math.min(newQty, stock);
  if (item.quantity <= 0) {
    removeFromCart(productId, couleurId, nomTaille);
  } else {
    saveCart(cart);
  }
}

export function removeFromCart(productId, couleurId, nomTaille) {
  const cart = getCart().filter(i =>
    !(i.productId === productId && i.couleurId === couleurId && i.nomTaille === nomTaille)
  );
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// ── CALCULS ───────────────────────────────────────────────

export function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const unitPrice = item.prix * (1 - item.reduction / 100);
    return sum + unitPrice * item.quantity;
  }, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

// ── DÉDUCTION STOCK APRÈS COMMANDE ───────────────────────

export function deductStock() {
  const cart      = getCart();
  const overrides = getStockOverrides();
  cart.forEach(item => {
    const key = `${item.couleurId}::${item.nomTaille}`;
    const current = overrides[key] !== undefined ? overrides[key] : item.stockOrigine;
    overrides[key] = Math.max(0, current - item.quantity);
  });
  localStorage.setItem(STOCK_KEY, JSON.stringify(overrides));
}

// ── BADGE NAVBAR ──────────────────────────────────────────

export function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = getCartCount();
}
