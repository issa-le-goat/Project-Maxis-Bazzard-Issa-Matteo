const express = require('express');
const router = express.Router();

// ✅ Assure-toi que le nom correspond exactement au fichier dans ton dossier controller
const userController = require('../controller/UserController'); 

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.post('/favoris', userController.addFavorite);
router.post('/panier', userController.addToCart);
router.get('/favoris/:userId', userController.getFavorites);
router.get('/cart/:userId', userController.getCart);
router.delete('/favoris', userController.removeFavorite);
router.delete('/cart', userController.removeFromCart);
router.put('/cart/update', userController.updateCartQuantity);
router.delete('/cart/clear/:userId', userController.clearCart);

module.exports = router;