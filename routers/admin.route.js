const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth')

router.get('/admin', auth, adminController.getAdminDashboard);

module.exports = router;