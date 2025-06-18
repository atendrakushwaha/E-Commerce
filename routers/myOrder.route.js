const express = require('express');
const router = express.Router();
const myOrderController = require('../controllers/myOrder.controller');
const auth = require('../middleware/auth')

router.get('/myorder',auth, myOrderController.myOrder );
router.get('/order/detail/:orderId/:productId', auth, myOrderController.orderDetail);

// router.get('/productdetail/:id',auth, (req, res) => res.render('user/productDetail'));

module.exports = router;