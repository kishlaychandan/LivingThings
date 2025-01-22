require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const chartRoutes = require('./routes/chartRoutes');
const logRoutes = require('./routes/logRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/charts', chartRoutes);
app.use('/api/logs', logRoutes);

module.exports = app;
