const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.post('/', verifyToken, bookingController.createBooking);
router.get('/', verifyToken, bookingController.getUserBookings);
router.get('/:id', verifyToken, bookingController.getBookingById);
router.delete('/:id', verifyToken, bookingController.cancelBooking);

module.exports = router;
