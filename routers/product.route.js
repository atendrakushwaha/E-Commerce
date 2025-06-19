const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth')
const uploadimage = require('../middleware/multer')


module.exports = router;