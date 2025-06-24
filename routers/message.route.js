const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const auth = require('../middleware/auth');

router.get('/chat/:receiverId', auth, messageController.getMessages);
router.post('/message/send/:receiverId', auth, messageController.sendMessage);
router.get('/api/messages/:receiverId', auth, messageController.getPreviousMessages);

module.exports = router;
