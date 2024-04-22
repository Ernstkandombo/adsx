const express = require('express');
const router = express.Router();
const controller = require('../controllers/adserve'); // Replace 'yourControllerFileName' with the actual name of your controller file

// Route for getting tracking info
router.post('/tracking', controller.postTrackingInfo);

// Route for serving ads
router.get('/:id', controller.adServe);

module.exports = router;
