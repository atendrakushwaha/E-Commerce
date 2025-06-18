const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth')
const uploadimage = require('../middleware/multer')

router.get('/product',auth, productController.product);

router.get('/editproduct/:id',auth, productController.editProductPage);
router.post('/editproduct/:id',auth,uploadimage.single('pimage'), productController.editProduct);
router.get('/deleteproduct/:id',auth, productController.deleteProduct);

module.exports = router;