const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth')


router.get('/user',auth, userController.getuserdash);

router.get('/profile', auth, userController.getUserProfile);

module.exports = router;


module.exports = router;