const express = require('express');
const { importChartData, getChartData } = require('../controllers/chartController');
const router = express.Router();

router.post('/import', importChartData);
router.get('/', getChartData);

module.exports = router;
