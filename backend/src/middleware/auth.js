const jwt = require('jsonwebtoken');
const { ERROR_MESSAGES } = require('../config/constants');

// Verify JWT Token
const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Check admin role
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: ERROR_MESSAGES.FORBIDDEN
    });
  }
  next();
};

// Check facilities manager role
const requireFacilitiesManager = (req, res, next) => {
  if (req.user?.role !== 'facilities_manager') {
    return res.status(403).json({
      success: false,
      message: ERROR_MESSAGES.FORBIDDEN
    });
  }
  next();
};

module.exports = {
  verifyToken,
  requireAdmin,
  requireFacilitiesManager
};
