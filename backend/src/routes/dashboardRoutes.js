// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.post('/friendrequest', dashboardController.friendRequest);
router.post('/acceptrequest', dashboardController.acceptFriendRequest);



module.exports = router;
