const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');
const auth = require('../middleware/auth');
const { route } = require('./admin.route');
const uploadimage = require('../middleware/multer');

router.get('/seller', auth, sellerController.getSellerDashboard);

router.get('/seller/products', auth, sellerController.getAddProduct);
router.post('/seller/addproduct', auth,uploadimage.single('pimage'), sellerController.addProduct);

router.get('/seller/products/list', auth, sellerController.getProductList);

// router.get('/seller/orders', auth, sellerController.myOrders);





module.exports = router;