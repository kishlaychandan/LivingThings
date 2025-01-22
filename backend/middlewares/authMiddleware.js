// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Protect middleware to verify JWT tokens
const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from 'Bearer <token>'

      const decoded = jwt.verify(token, process.env.SECRET);  // Verify JWT token
      req.user = decoded; // Attach user data to the request object

      next(); // Call next() to move to the next middleware/route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };  // Export the middleware properly
