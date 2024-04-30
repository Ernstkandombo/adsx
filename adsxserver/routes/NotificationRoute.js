// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/Notification');

router.get('/:userId', notificationController.getNotificationsByUserId);

module.exports = router;
