const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');

router.post('/shorten', controller.shortenUrl);
router.get('/stats/:shortId', controller.getStats);
router.get('/:shortId', controller.redirectToOriginal);


module.exports = router;
