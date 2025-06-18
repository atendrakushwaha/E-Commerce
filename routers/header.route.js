const headercontroller = require('../controllers/header.controller');
const express = require('express');
const router = express.Router();


router.get('/header', headercontroller.header);

module.exports = router;