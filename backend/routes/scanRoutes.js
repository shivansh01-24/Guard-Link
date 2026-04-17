const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const auth = require('../middleware/authMiddleware');

router.post('/scan', auth, scanController.startScan);
router.get('/results', auth, scanController.getHistory);

module.exports = router;
