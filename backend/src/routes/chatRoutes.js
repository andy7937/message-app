// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/:user1/:user2', chatController.getOrCreateChat);
router.post('/group', chatController.getOrCreateGroupChat);
router.post('/:user1/:user2', chatController.sendMessage);
router.post('/group/message', chatController.sendGroupMessage);

module.exports = router;