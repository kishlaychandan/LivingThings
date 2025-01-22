const ChartData = require('../models/chartData');

// Import JSON into MongoDB
exports.importChartData = async (req, res) => {
  const jsonData = req.body; // Ensure your JSON data is in the request body
  try {
    await ChartData.insertMany(jsonData);
    res.status(201).send('Chart data imported successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Chart Data
exports.getChartData = async (req, res) => {
  try {
    const { startDate, endDate, algoStatus } = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (algoStatus) {
      filter.algo_status = algoStatus;
    }

    const data = await ChartData.find(filter);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
