require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const chartRoutes = require('./routes/chartRoutes');
const logRoutes = require('./routes/logRoutes');
// const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log("i am here bro");
    res.send('Hello World!');
})

app.post('/api/charts/import', (req, res) => {
    // Handle the import logic here
    res.status(200).send("Data imported successfully.");
  });
app.use('/api/charts', chartRoutes);
app.use('/api/logs', logRoutes);
// app.use('/api/auth', authRoutes);
module.exports = app;
