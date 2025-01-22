require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const chartRoutes = require('./routes/chartRoutes');
const { protect } = require('./middlewares/authMiddleware');
const logRoutes = require('./routes/logRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const PORT = process.env.PORT || 3000;


connectDB();

const app = express();

app.use(cors());
// app.use(bodyParser.json());
// Increase the limit (e.g., 50mb for large payloads)
app.use(bodyParser.json({ limit: '50mb' }));


app.use('/api/charts', protect, chartRoutes); // Protect chart data route
app.use('/api/auth', authRoutes); // Routes for login and registration
// app.use('/api/charts', chartRoutes);
app.use('/api/logs', logRoutes);
// app.use('/api/auth', authRoutes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
module.exports = app;
