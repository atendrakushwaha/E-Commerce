const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

module.exports = router;
