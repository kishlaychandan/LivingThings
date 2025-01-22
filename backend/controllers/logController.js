const AccessLog = require('../models/accessLog');

exports.createAccessLog = async (req, res) => {
  try {
    const log = new AccessLog(req.body);
    await log.save();
    res.status(201).send('Access log created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccessLogs = async (req, res) => {
  try {
    const logs = await AccessLog.find().sort({ accessTime: 1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
