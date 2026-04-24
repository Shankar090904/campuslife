const { isTimeSlotOverlap } = require('./validators');

// Get recommended booking times based on occupancy patterns
const getRecommendedTimes = (resourceBookings, resourceAvailability) => {
  const recommendations = [];
  
  // Generate 1-hour slots throughout the day
  const startHour = parseInt(resourceAvailability.available_from.split(':')[0]);
  const endHour = parseInt(resourceAvailability.available_until.split(':')[0]);
  
  for (let hour = startHour; hour < endHour; hour++) {
    const slotStart = `${String(hour).padStart(2, '0')}:00:00`;
    const slotEnd = `${String(hour + 1).padStart(2, '0')}:00:00`;
    
    // Check if slot is available
    const isAvailable = !resourceBookings.some(booking => 
      isTimeSlotOverlap(slotStart, slotEnd, booking.start_time, booking.end_time)
    );
    
    if (isAvailable) {
      recommendations.push({
        start: slotStart,
        end: slotEnd,
        score: calculateTimeSlotScore(hour)
      });
    }
  }
  
  // Sort by score (higher is better)
  return recommendations.sort((a, b) => b.score - a.score);
};

// Calculate score for a time slot (prefers off-peak)
const calculateTimeSlotScore = (hour) => {
  // Off-peak hours (before 9 AM, after 5 PM) get higher scores
  if (hour < 9 || hour >= 17) {
    return 100;
  }
  
  // Mid-morning and early afternoon get lower scores
  if (hour >= 10 && hour < 12) {
    return 40;
  }
  if (hour >= 14 && hour < 16) {
    return 50;
  }
  
  return 70;
};

// Find similar available resources if booking fails
const findAlternativeResources = (originalResource, bookingDate, startTime, endTime, allResources, allBookings) => {
  return allResources
    .filter(resource => 
      resource.id !== originalResource.id &&
      resource.type === originalResource.type &&
      resource.status === 'active'
    )
    .filter(resource => {
      // Check if time slot is available for this resource
      const conflictingBookings = allBookings.filter(b => 
        b.resource_id === resource.id && 
        new Date(b.booking_date).toDateString() === new Date(bookingDate).toDateString()
      );
      
      return !conflictingBookings.some(b => 
        isTimeSlotOverlap(startTime, endTime, b.start_time, b.end_time)
      );
    })
    .slice(0, 3); // Return top 3 alternatives
};

module.exports = {
  getRecommendedTimes,
  calculateTimeSlotScore,
  findAlternativeResources
};
