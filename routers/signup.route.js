const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller');
const uploadimage = require('../middleware/multer')

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signupPage');  // EJS view: views/signupPage.ejs
});

// Handle signup form submission
router.post('/home',uploadimage.single('pimage'), signupController.signup);

module.exports = router;
