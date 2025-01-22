const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  accessTime: { type: String, required: true },
  accessDate: { type: String, required: true },
  employeeName: { type: String, required: true },
  algoStatus: { type: String, required: true },
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
