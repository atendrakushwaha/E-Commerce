
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const auth = require('../middleware/auth');



router.get('/addtocart/:id',auth, cartController.addtoCart);

// router.get('/cart',auth, cartController.cartpage);




module.exports = router;