const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  total_kwh: { type: Number, required: true },
  algo_status: { type: Number, required: true },
});

module.exports = mongoose.model('ChartData', chartDataSchema);
