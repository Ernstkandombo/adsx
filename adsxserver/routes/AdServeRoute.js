const express = require('express');
const adServeController = require('../controllers/adserve');

const router = express.Router();

router.get('/:id', adServeController.adServe);

module.exports = router;