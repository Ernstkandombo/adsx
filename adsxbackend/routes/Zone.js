const express = require('express');
const ZoneController = require('../controllers/Zone');

const router = express.Router();

router.post('/', ZoneController.createZone);
router.get('/', ZoneController.getZones);
router.get('/:id', ZoneController.getZone);
router.put('/:id', ZoneController.updateZone);
router.delete('/:id', ZoneController.deleteZone);
router.get('/website/:websiteId', ZoneController.getZonesByWebsite);
router.get('/stats/:id', ZoneController.getZoneStats);

module.exports = router;