const express = require('express');
const publisherController = require('../controllers/Publisher');

const router = express.Router();

router.post('/', publisherController.createPublisher);
router.get('/', publisherController.getPublishers);
router.get('/:id', publisherController.getPublisher);
router.put('/:id', publisherController.updatePublisher);
router.delete('/:id', publisherController.deletePublisher);
router.get('/website/:websiteId', publisherController.getPublishersByWebsite);
router.get('/stats/:id', publisherController.getPublisherStats);

module.exports = router;