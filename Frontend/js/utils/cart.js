// =========================================================
// MAXIBAZARD — Utilitaires Panier (localStorage)
// =========================================================

const CART_KEY = 'maxibazard_cart';
const STOCK_KEY = 'maxibazard_stock';

/** Retourne le panier complet */
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

/** Sauvegarde le panier */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/** Retourne le stock modifié (après achats) */
export function getStockOverrides() {
  return JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
}

/** Retourne le stock réel d'un produit */
export function getRealStock(product) {
  const overrides = getStockOverrides();
  return overrides[product.id] !== undefined ? overrides[product.id] : product.stock;
}

/** Ajoute ou incrémente un produit dans le panier */
export function addToCart(product, quantity, color, size) {
  const cart = getCart();
  const stock = getRealStock(product);

  // Calcul quantité déjà en panier
  const existingItem = cart.find(
    item => item.productId === product.id && item.selectedColor === color && item.selectedSize === size
  );
  const alreadyInCart = existingItem ? existingItem.quantity : 0;

  if (alreadyInCart + quantity > stock) {
    return { success: false, message: `Stock insuffisant. Disponible : ${stock - alreadyInCart}` };
  }

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      price: product.price,
      discount: product.discount,
      currency: product.currency,
      quantity,
      selectedColor: color,
      selectedSize: size
    });
  }

  saveCart(cart);
  return { success: true, message: 'Produit ajouté au panier !' };
}

/** Modifie la quantité d'un article du panier */
export function updateCartItem(productId, color, size, newQty, product) {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId && i.selectedColor === color && i.selectedSize === size);
  if (!item) return;
  const stock = getRealStock(product);
  item.quantity = Math.min(newQty, stock);
  if (item.quantity <= 0) return removeFromCart(productId, color, size);
  saveCart(cart);
}

/** Supprime un article du panier */
export function removeFromCart(productId, color, size) {
  let cart = getCart();
  cart = cart.filter(i => !(i.productId === productId && i.selectedColor === color && i.selectedSize === size));
  saveCart(cart);
}

/** Vide le panier */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

/** Calcule le total du panier */
export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const finalPrice = item.price * (1 - item.discount / 100);
    return sum + finalPrice * item.quantity;
  }, 0);
}

/** Retourne le nombre d'articles dans le panier */
export function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/** Réduit le stock après commande */
export function deductStock(products) {
  const cart = getCart();
  const overrides = getStockOverrides();

  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return;
    const currentStock = overrides[item.productId] !== undefined ? overrides[item.productId] : product.stock;
    overrides[item.productId] = Math.max(0, currentStock - item.quantity);
  });

  localStorage.setItem(STOCK_KEY, JSON.stringify(overrides));
}

/** Met à jour le badge panier dans la navbar */
export function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = getCartCount();
}
