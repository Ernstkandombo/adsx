const express = require('express');
const websiteController = require('../controllers/Website');

const router = express.Router();

router.post('/', websiteController.createWebsite);
router.get('/', websiteController.getWebsites);
router.get('/:id', websiteController.getWebsite);
router.put('/:id', websiteController.updateWebsite);
router.delete('/:id', websiteController.deleteWebsite);

router.get('/publisher/:id', websiteController.getWebsitesByPublisher);


module.exports = router; 