const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Routes for one-to-one chats
router.get('/:user1/:user2', chatController.getOrCreateChat); // Retrieve or create a chat
router.post('/:user1/:user2/message', chatController.sendMessage); // Send a message in a chat

module.exports = router;
