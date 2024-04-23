const express = require('express');
const adItemController = require('../controllers/AdItem');

const router = express.Router();

// Create a new AdItem
router.post('/', adItemController.createAdItem);

// Get all AdItems
router.get('/', adItemController.getAdItems);

// Get a specific AdItem by ID
router.get('/:id', adItemController.getAdItem);

// Update a specific AdItem by ID
router.put('/:id', adItemController.updateAdItem);

// Delete a specific AdItem by ID
router.delete('/:id', adItemController.deleteAdItem);


// Delete a specific AdItem by ID
router.get('/advertiser/:id', adItemController.getAdItemByAvertiser);

module.exports = router;