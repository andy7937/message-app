// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/:user1/:user2', chatController.getOrCreateChat);
router.post('/:user1/:user2', chatController.sendMessage);

module.exports = router;
