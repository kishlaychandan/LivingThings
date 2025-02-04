const ChartData = require('../models/chartData'); // ChartData Mongoose model
const { protect } = require('../middlewares/authMiddleware');

// Import JSON into MongoDB
const mongoose = require('mongoose');
// const ChartData = require('../models/ChartData'); // Path to your ChartData model

exports.importChartData = async (req, res) => {
  console.log("I am here");

  // Ensure your JSON data is in the request body
  const jsonData = req.body;

  // Convert the incoming JSON data to the correct types
  const formattedData = jsonData.map(item => {
    return {
      createdAt: new Date(item.createdAt.$date),  // Convert $date to Date
      updatedAt: new Date(item.updatedAt.$date),  // Convert $date to Date
      serialNo: item.serialNo,
      clientID: new mongoose.Types.ObjectId(item.clientID.$oid),  // Corrected ObjectId conversion with 'new'
      deviceMapID: new mongoose.Types.ObjectId(item.deviceMapID.$oid),  // Corrected ObjectId conversion with 'new'
      devices: item.devices.map(device => new mongoose.Types.ObjectId(device.$oid)),  // Convert each device $oid to ObjectId
      total_kwh: item.total_kwh,
      ac_run_hrs: item.ac_run_hrs,
      ac_fan_hrs: item.ac_fan_hrs,
      algo_status: item.algo_status,
      billing_ammount: item.billing_ammount,
      cost_reduction: item.cost_reduction,
      energy_savings: item.energy_savings,  // Assuming it's already a correct object format
      mitigated_co2: item.mitigated_co2,
      weather: item.weather,  // Assuming it's already a correct object format
    };
  });

  try {
    // Insert the formatted data into the MongoDB collection
    await ChartData.insertMany(formattedData);
    res.status(201).send("Chart data imported successfully");
  } catch (error) {
    console.error("Error importing chart data:", error);
    res.status(500).json({ error: error.message });
  }
};


// Fetch Chart Data
exports.getChartData = async (req, res) => {
  try {
    console.log("getChartData", req.query);

    // Extracting parameters from the query string
    const { startDate, endDate, algoStatus } = req.query;
    const filter = {};

    // Date filtering: Check if both startDate and endDate are provided
    if (startDate && endDate) {
      console.log("Filtering by date range");
      filter.createdAt = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    }

    // Filter by algo_status: Convert "active" to 1, otherwise 0
    if (algoStatus) {
      console.log("Filtering by algo_status:", algoStatus);
      filter.algo_status = algoStatus === 'active' ? 1 : 0;
    }

    console.log("filter object:", filter);

    // Query the database with the filter
    const data = await ChartData.find(filter);
    console.log("Query result:", data);

    // Send the data as JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getChartData:", error.message);
    res.status(500).json({ error: error.message });
  }
};
