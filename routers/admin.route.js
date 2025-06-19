const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth');
const uploadimage = require('../middleware/multer');

router.get('/admin', auth, adminController.getAdminDashboard);

router.get('/admin/pendingProducts', auth, adminController.getPendingProducts);
router.post('/admin/product/:id/status', auth, adminController.updateProductStatus);

router.get('/product',auth, adminController.product);

router.get('/editproduct/:id',auth, adminController.editProductPage);
router.post('/editproduct/:id',auth,uploadimage.single('pimage'), adminController.editProduct);
router.get('/deleteproduct/:id',auth, adminController.deleteProduct);


module.exports = router;