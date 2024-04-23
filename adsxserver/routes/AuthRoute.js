// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/Auth');

router.post('/authenticate', authenticate);

module.exports = router;
