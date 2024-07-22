const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Routes for one-to-one chats
router.get('/:user1/:user2', chatController.getOrCreateChat); // Retrieve or create a chat
router.post('/:user1/:user2/message', chatController.sendMessage); // Send a message in a chat

// Routes for group chats
router.post('/creategroupchat', chatController.createGroupChat); // Create or retrieve a group chat
router.get('/groupchat/:username', chatController.getGroupChat); // Get all group chats for a user
router.get('/groupchat/:groupChatName', chatController.openGroupChat); // Get a specific group chat
router.post('/groupchat/:groupChatName/message', chatController.sendGroupMessage); // Send a message in a group chat

module.exports = router;
