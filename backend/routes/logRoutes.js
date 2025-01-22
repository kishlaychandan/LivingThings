const express = require('express');
const { createAccessLog, getAccessLogs } = require('../controllers/logController');
const router = express.Router();

router.post('/', createAccessLog);
router.get('/', getAccessLogs);

module.exports = router;
