const express = require('express');
const router = express.Router();
const addproductController = require('../controllers/addproduct.controller');
const uploadimage = require('../middleware/multer')
const auth = require('../middleware/auth')

router.get('/addproduct', auth, addproductController.getaddproduct);

router.post('/addproduct', auth,uploadimage.single('pimage'), addproductController.addproduct);

module.exports = router;
