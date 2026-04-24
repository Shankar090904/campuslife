const pool = require('../config/database');
const { ERROR_MESSAGES, BOOKING_STATUS } = require('../config/constants');
const { isTimeSlotOverlap, calculateDuration } = require('../utils/validators');
const { calculateCarbonFootprint } = require('../utils/sustainability');
const { findAlternativeResources } = require('../utils/algorithms');

// Create booking
const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resource_id, booking_date, start_time, end_time, booking_purpose } = req.body;

    // Validate input
    if (!resource_id || !booking_date || !start_time || !end_time) {
      return res.status(400).json({
        success: false,
        message: 'Resource ID, date, start time, and end time are required'
      });
    }

    // Check if resource exists
    const resourceResult = await pool.query('SELECT * FROM resources WHERE id = $1', [resource_id]);
    if (resourceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND
      });
    }

    const resource = resourceResult.rows[0];

    // Check for time conflicts
    const conflictResult = await pool.query(
      'SELECT * FROM bookings WHERE resource_id = $1 AND booking_date = $2 AND status IN ($3, $4)',
      [resource_id, booking_date, BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.COMPLETED]
    );

    for (let booking of conflictResult.rows) {
      if (isTimeSlotOverlap(start_time, end_time, booking.start_time, booking.end_time)) {
        // Find alternative resources
        const allResourcesResult = await pool.query('SELECT * FROM resources WHERE status = $1', ['active']);
        const allBookingsResult = await pool.query('SELECT * FROM bookings');
        const alternatives = findAlternativeResources(resource, booking_date, start_time, end_time, allResourcesResult.rows, allBookingsResult.rows);

        return res.status(409).json({
          success: false,
          message: ERROR_MESSAGES.BOOKING_CONFLICT,
          alternatives
        });
      }
    }

    // Create booking
    const bookingResult = await pool.query(
      'INSERT INTO bookings (user_id, resource_id, booking_date, start_time, end_time, status, booking_purpose) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, resource_id, booking_date, start_time, end_time, BOOKING_STATUS.CONFIRMED, booking_purpose]
    );

    const booking = bookingResult.rows[0];

    // Calculate duration and create usage log
    const duration = calculateDuration(start_time, end_time);
    const carbonFootprint = calculateCarbonFootprint(resource, duration, 1);

    await pool.query(
      'INSERT INTO usage_logs (resource_id, booking_id, user_id, duration_minutes, carbon_equivalent) VALUES ($1, $2, $3, $4, $5)',
      [resource_id, booking.id, userId, duration, carbonFootprint]
    );

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking,
        carbon_footprint: carbonFootprint
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT b.*, r.name as resource_name, r.type as resource_type, r.location FROM bookings b JOIN resources r ON b.resource_id = r.id WHERE b.user_id = $1 ORDER BY b.booking_date DESC',
      [userId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Get booking details
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT b.*, r.name as resource_name, r.type as resource_type, r.location FROM bookings b JOIN resources r ON b.resource_id = r.id WHERE b.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.BOOKING_NOT_FOUND
      });
    }

    // Check authorization
    if (result.rows[0].user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: ERROR_MESSAGES.FORBIDDEN
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get booking
    const bookingResult = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (bookingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.BOOKING_NOT_FOUND
      });
    }

    // Check authorization
    if (bookingResult.rows[0].user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: ERROR_MESSAGES.FORBIDDEN
      });
    }

    // Update booking status
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [BOOKING_STATUS.CANCELLED, id]
    );

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking
};
