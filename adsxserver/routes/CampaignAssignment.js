const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/CampainAssignment');


router.post('/', campaignController.associateCampaignWithZone);
// GET CampaignAssignment by ID
router.get('/:id', campaignController.getCampaignAssignmentById);

// DELETE CampaignAssignment by ID
router.delete('/:id', campaignController.deleteCampaignAssignmentById);

module.exports = router;
