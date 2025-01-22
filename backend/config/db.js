const mongoose = require('mongoose');
//express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = async () => {
  try {
    // MongoDB URI with localhost (creates the DB automatically when data is inserted)
    // await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
    await mongoose.connect(process.env.MONGO_URI);
    // app.listen(PORT,()=>console.log(`Server is running on port no ${PORT}`))
}
catch(err){
    console.log(err)
}
};

module.exports = connectDB;
 