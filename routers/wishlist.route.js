const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const auth = require('../middleware/auth')

router.get('/wishlist',auth, wishlistController.getWishlist);
router.post('/addwishlist/:id',auth, wishlistController.addWishlist);
router.post('/removewishlist/:id',auth, wishlistController.removeWishlist);


module.exports = router;