// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  console.log("registerUser", req.body);
  
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    console.log("test 0");
    
    if (userExists) {
      console.log("userExists", userExists);
      
      return res.status(400).json({ message: 'User already exists' });
    }
    
    console.log("test 1");
    const user = new User({ username, email, password });
    console.log("test 2");
    
    await user.save();
    console.log("test 3");
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
