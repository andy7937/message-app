// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.post('/friendrequest', dashboardController.friendRequest);
router.post('/acceptfriendrequest', dashboardController.acceptFriendRequest);
router.post('/declinefriendrequest', dashboardController.declineFriendRequest);



module.exports = router;
