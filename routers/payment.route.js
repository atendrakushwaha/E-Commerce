const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const auth = require('../middleware/auth')

router.post('/createOrder',auth, paymentController.createOrder);
router.post('/saveOrder',auth, paymentController.saveOrder);

module.exports = router;