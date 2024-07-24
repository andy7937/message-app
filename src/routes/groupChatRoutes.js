const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/groupChatController');

// Routes for group chats
router.post('/creategroupchat', groupChatController.createGroupChat); // Create or retrieve a group chat
router.get('/:username/get', groupChatController.getGroupChat); // Get all group chats for a user
router.get('/:groupChatName/open', groupChatController.openGroupChat); // Get a specific group chat
router.post('/:groupChatName/message', groupChatController.sendGroupMessage); // Send a message in a group chat
router.delete('/:groupChatName/delete', groupChatController.deleteGroupChat); // Delete a group chat

module.exports = router;
