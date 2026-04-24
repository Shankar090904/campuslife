// Validate booking time
const validateBookingTime = (startTime, endTime) => {
  const start = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);
  return start < end;
};

// Validate resource capacity
const validateCapacity = (capacity) => {
  return capacity > 0 && capacity <= 500;
};

// Check if time slot overlaps with another
const isTimeSlotOverlap = (start1, end1, start2, end2) => {
  const s1 = new Date(`2000-01-01 ${start1}`);
  const e1 = new Date(`2000-01-01 ${end1}`);
  const s2 = new Date(`2000-01-01 ${start2}`);
  const e2 = new Date(`2000-01-01 ${end2}`);
  
  return s1 < e2 && s2 < e1;
};

// Calculate booking duration in minutes
const calculateDuration = (startTime, endTime) => {
  const start = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);
  return Math.round((end - start) / (1000 * 60));
};

module.exports = {
  validateBookingTime,
  validateCapacity,
  isTimeSlotOverlap,
  calculateDuration
};
