const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/viewproduct/:id', productController.viewCart); 

module.exports = router;