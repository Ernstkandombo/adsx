const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/CampainAssignment');

router.post('/', campaignController.associateCampaignWithZone);

module.exports = router;
