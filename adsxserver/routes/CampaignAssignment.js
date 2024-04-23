const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/CampainAssignment');


router.post('/', campaignController.associateCampaignWithPlacement);
// GET CampaignAssignment by ID
router.get('/:id', campaignController.getCampaignAssignmentById);



module.exports = router;
