const express = require('express');
const advertiserController = require('../controllers/Advertiser');

const router = express.Router();

router.post('/', advertiserController.createAdvertiser);
router.get('/', advertiserController.getAdvertisers);
router.get('/:id', advertiserController.getAdvertiser);
router.put('/:id', advertiserController.updateAdvertiser);
router.delete('/:id', advertiserController.deleteAdvertiser);
router.get('/:id/stats', advertiserController.getAdvertiserStats);

module.exports = router;