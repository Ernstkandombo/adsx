const express = require('express');
const placementController = require('../controllers/Placement');

const router = express.Router();

router.post('/', placementController.createPlacement);
router.get('/', placementController.getPlacements);
router.get('/:id', placementController.getPlacement);
router.put('/:id', placementController.updatePlacement);
router.delete('/:id', placementController.deletePlacement);
router.get('/publisher/:publisherId', placementController.getPlacementsByPublisher);
router.get('/stats/:id', placementController.getPlacementStats);

module.exports = router;