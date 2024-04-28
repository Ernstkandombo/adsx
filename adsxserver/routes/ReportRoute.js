const express = require('express');
const router = express.Router();
const controller = require('../controllers/Report');

// Route for getting adveriser metrics data
router.post('/advertiser/:userID', controller.getAdvertiserMetrixData);
// Route for getting publisher metrics data
router.post('/publisher/:userID', controller.getPublisherMetrixData);

router.get('/campaigns/:campaignId', controller.getCampaignMetrics);

module.exports = router;
