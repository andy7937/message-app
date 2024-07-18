// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.post('/friendrequest', dashboardController.friendRequest);
router.post('/friendrequest', dashboardController.pendingRequest);



module.exports = router;
