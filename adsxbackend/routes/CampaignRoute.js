const express = require('express');
const campaignController = require('../controllers/Campaign');

const router = express.Router();

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getCampaigns);
router.get('/:id', campaignController.getCampaign);
router.put('/:id', campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);
router.get('/advertiser/:advertiserId', campaignController.getCampaignsByAdvertiser);
router.get('/stats/:id', campaignController.getCampaignStats);

module.exports = router;