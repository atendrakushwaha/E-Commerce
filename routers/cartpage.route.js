const express = require('express');
const router = express.Router();
const cartpageController = require('../controllers/cartpage.controller');
const auth = require('../middleware/auth');

router.get('/cart',auth, cartpageController.cartpage);

router.get('/increasequantity/:id',auth, cartpageController.increaseQuantity);

router.get('/decreasequantity/:id',auth, cartpageController.decreaseQuantity);

router.get('/removeproduct/:id',auth, cartpageController.removeProduct);

module.exports = router;