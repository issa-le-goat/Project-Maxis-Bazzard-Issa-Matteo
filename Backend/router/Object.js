const express = require('express');
const router = express.Router();
const objectController = require('../controller/Objects');

router.get('/Objects', objectController.getObjects);
router.get('/Object/:id', objectController.getObjById);

module.exports = router;