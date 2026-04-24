const pool = require('../config/database');
const { ERROR_MESSAGES, RESOURCE_STATUS } = require('../config/constants');

// Get all resources
const getAllResources = async (req, res) => {
  try {
    const { type, location, capacity } = req.query;

    let query = 'SELECT * FROM resources WHERE status = $1';
    let params = [RESOURCE_STATUS.ACTIVE];
    let paramIndex = 2;

    if (type) {
      query += ` AND type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (location) {
      query += ` AND location ILIKE $${paramIndex}`;
      params.push(`%${location}%`);
      paramIndex++;
    }

    if (capacity) {
      query += ` AND capacity >= $${paramIndex}`;
      params.push(parseInt(capacity));
      paramIndex++;
    }

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Get single resource
const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM resources WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Create resource (admin only)
const createResource = async (req, res) => {
  try {
    const { name, type, location, capacity, description, available_from, available_until, carbon_footprint } = req.body;

    const result = await pool.query(
      'INSERT INTO resources (name, type, location, capacity, description, available_from, available_until, carbon_footprint, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, type, location, capacity, description, available_from || '08:00:00', available_until || '18:00:00', carbon_footprint || 0, RESOURCE_STATUS.ACTIVE]
    );

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Update resource (admin only)
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, location, capacity, description, available_from, available_until, status, carbon_footprint } = req.body;

    const result = await pool.query(
      'UPDATE resources SET name = COALESCE($1, name), type = COALESCE($2, type), location = COALESCE($3, location), capacity = COALESCE($4, capacity), description = COALESCE($5, description), available_from = COALESCE($6, available_from), available_until = COALESCE($7, available_until), status = COALESCE($8, status), carbon_footprint = COALESCE($9, carbon_footprint) WHERE id = $10 RETURNING *',
      [name, type, location, capacity, description, available_from, available_until, status, carbon_footprint, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND
      });
    }

    res.json({
      success: true,
      message: 'Resource updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Delete resource (admin only)
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM resources WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND
      });
    }

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// Get resource availability
const getResourceAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    // Get resource
    const resourceResult = await pool.query('SELECT * FROM resources WHERE id = $1', [id]);
    if (resourceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND
      });
    }

    const resource = resourceResult.rows[0];

    // Get bookings for that date
    const bookingsResult = await pool.query(
      'SELECT start_time, end_time FROM bookings WHERE resource_id = $1 AND booking_date = $2 AND status IN ($3, $4)',
      [id, date, 'confirmed', 'completed']
    );

    res.json({
      success: true,
      data: {
        resource,
        bookings: bookingsResult.rows,
        availability_hours: {
          from: resource.available_from,
          to: resource.available_until
        }
      }
    });
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getResourceAvailability
};
