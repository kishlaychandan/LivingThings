const mongoose = require('mongoose');

// Energy savings schema for nested object
const energySavingsSchema = new mongoose.Schema({
  savings_percent: { type: Number },
  ref_kwh: { type: Number },
  us_meter: { type: Number },
  us_calc: { type: Number },
  inv_factor: { type: Number }
}, { _id: false });

// Weather schema for nested object
const weatherSchema = new mongoose.Schema({
  max_temp: { type: Number },
  min_temp: { type: Number }
}, { _id: false });

const chartDataSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  serialNo: { type: String, required: true },
  clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  deviceMapID: { type: mongoose.Schema.Types.ObjectId, ref: 'DeviceMap', required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  total_kwh: { type: Number, required: true },
  ac_run_hrs: { type: Number },
  ac_fan_hrs: { type: Number },
  algo_status: { type: Number, required: true },
  billing_ammount: { type: Number },
  cost_reduction: { type: Number },
  energy_savings: energySavingsSchema,
  mitigated_co2: { type: Number },
  weather: weatherSchema
}, { timestamps: true });

module.exports = mongoose.model('ChartData', chartDataSchema);
