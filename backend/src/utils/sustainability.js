// Calculate carbon footprint for a booking
const calculateCarbonFootprint = (resource, durationMinutes, occupancyCount) => {
  // Base carbon footprint from resource
  let baseCarbon = resource.carbon_footprint || 0;
  
  // Reduce carbon if shared with more people
  const sharingFactor = Math.max(0.5, 1 - (occupancyCount * 0.1));
  
  // Time-based factor (off-peak hours are greener)
  const timeFactor = 1; // Can be modified based on time
  
  // Duration factor
  const durationFactor = (durationMinutes / 60) * 0.5;
  
  // Calculate total carbon equivalent
  const carbonEquivalent = (baseCarbon * sharingFactor * timeFactor) + durationFactor;
  
  return Math.round(carbonEquivalent * 100) / 100;
};

// Calculate eco-points for a booking
const calculateEcoPoints = (booking, isOffPeak = false, isShared = false) => {
  let points = 10; // Base points
  
  // Off-peak booking bonus
  if (isOffPeak) {
    points += 20;
  }
  
  // Shared booking bonus
  if (isShared) {
    points += 15;
  }
  
  return points;
};

// Determine if a time is off-peak
const isOffPeakHour = (hour) => {
  // Off-peak: before 9 AM or after 5 PM
  return hour < 9 || hour >= 17;
};

// Calculate sustainability score for a resource
const calculateResourceSustainabilityScore = (resource, utilizationRate) => {
  let score = 100;
  
  // Lower carbon footprint = higher score
  score -= Math.min(resource.carbon_footprint || 0, 20);
  
  // Higher utilization = higher score
  score += (utilizationRate * 20);
  
  return Math.max(0, Math.min(100, score));
};

module.exports = {
  calculateCarbonFootprint,
  calculateEcoPoints,
  isOffPeakHour,
  calculateResourceSustainabilityScore
};
