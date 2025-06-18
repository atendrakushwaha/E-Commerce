const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');


router.get('/viewUserAdmin',auth, userController.getuserAdmin);
router.get('/deleteuser/:id',auth, userController.deleteUser); 

module.exports = router;