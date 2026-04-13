// =========================================================
// MAXIBAZARD — Routes API
// =========================================================
const express  = require('express');
const router   = express.Router();

const productsCtrl  = require('../controllers/productsController');
const cartCtrl      = require('../controllers/cartController');
const favoritesCtrl = require('../controllers/favoritesController');
const ordersCtrl    = require('../controllers/ordersController');

// ── PRODUITS ──────────────────────────────────────────────
// GET  /api/products               → tous les produits (+ filtres query)
// GET  /api/products/genres        → liste des genres uniques
// GET  /api/products/:id           → un produit détaillé
// GET  /api/products/:id/similar   → produits similaires
// PATCH /api/products/stock        → déduire stock (body: [{tailleId, quantity}])

router.get('/products',               productsCtrl.getAllProducts);
router.get('/products/genres',        productsCtrl.getGenres);
router.get('/products/:id',           productsCtrl.getProductById);
router.get('/products/:id/similar',   productsCtrl.getSimilarProducts);
router.patch('/products/stock',       productsCtrl.deductStock);

// ── PANIER ────────────────────────────────────────────────
// GET    /api/cart                → articles du panier (header: X-Session-ID)
// POST   /api/cart                → ajouter un article
// PATCH  /api/cart/:id            → modifier quantité
// DELETE /api/cart/:id            → supprimer un article
// DELETE /api/cart                → vider le panier

router.get('/cart',            cartCtrl.getCart);
router.post('/cart',           cartCtrl.addToCart);
router.patch('/cart/:panierItemId',  cartCtrl.updateCartItem);
router.delete('/cart/:panierItemId', cartCtrl.removeCartItem);
router.delete('/cart',         cartCtrl.clearCart);

// ── FAVORIS ───────────────────────────────────────────────
// GET    /api/favorites           → liste des favoris
// POST   /api/favorites           → ajouter un favori  (body: {productId})
// DELETE /api/favorites/:id       → supprimer un favori

router.get('/favorites',            favoritesCtrl.getFavorites);
router.post('/favorites',           favoritesCtrl.addFavorite);
router.delete('/favorites/:productId', favoritesCtrl.removeFavorite);

// ── COMMANDES ─────────────────────────────────────────────
// GET  /api/orders                → historique commandes
// POST /api/orders                → passer commande (vide le panier + déduit stock)

router.get('/orders',    ordersCtrl.getOrders);
router.post('/orders',   ordersCtrl.placeOrder);

// ── ADRESSES ──────────────────────────────────────────────
// GET    /api/addresses           → adresses sauvegardées
// POST   /api/addresses           → sauvegarder une adresse
// DELETE /api/addresses/:id       → supprimer une adresse

router.get('/addresses',         ordersCtrl.getAddresses);
router.post('/addresses',        ordersCtrl.saveAddress);
router.delete('/addresses/:id',  ordersCtrl.deleteAddress);

module.exports = router;
