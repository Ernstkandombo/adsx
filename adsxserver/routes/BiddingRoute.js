const express = require('express');
const router = express.Router();
const controller = require('../controllers/Bidding'); // Replace 'yourControllerFileName' with the actual name of your controller file

// Route for getting tracking info
router.post('/', controller.bidding);


module.exports = router;
