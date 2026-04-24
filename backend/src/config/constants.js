// Role constants
const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin',
  FACILITIES_MANAGER: 'facilities_manager'
};

// Booking status constants
const BOOKING_STATUS = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  PENDING: 'pending'
};

// Resource status constants
const RESOURCE_STATUS = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  INACTIVE: 'inactive'
};

// Resource types
const RESOURCE_TYPES = {
  CLASSROOM: 'classroom',
  LAB: 'lab',
  MEETING_ROOM: 'meeting_room',
  PARKING: 'parking',
  EQUIPMENT: 'equipment'
};

// Error messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_EXISTS: 'User with this email already exists',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden',
  INVALID_INPUT: 'Invalid input',
  SERVER_ERROR: 'Internal server error',
  BOOKING_CONFLICT: 'Resource is already booked for this time',
  RESOURCE_NOT_FOUND: 'Resource not found',
  BOOKING_NOT_FOUND: 'Booking not found'
};

module.exports = {
  ROLES,
  BOOKING_STATUS,
  RESOURCE_STATUS,
  RESOURCE_TYPES,
  ERROR_MESSAGES
};
