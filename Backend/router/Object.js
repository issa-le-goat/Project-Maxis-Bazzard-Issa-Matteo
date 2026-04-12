const express = require('express');
const router = express.Router();
const objectController = require('../controller/Objects'); // Vérifie bien le nom du fichier !

router.get('/objects', objectController.getObjects);
router.get('/object/:id', objectController.getObjById);
router.post('/update-stock', objectController.updateStock);

module.exports = router;