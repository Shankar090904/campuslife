-- Create database
CREATE DATABASE IF NOT EXISTS campuslife;

-- Use the database
\c campuslife;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  department VARCHAR(100),
  phone VARCHAR(20),
  avatar_url VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  capacity INT NOT NULL,
  description TEXT,
  available_from TIME DEFAULT '08:00:00',
  available_until TIME DEFAULT '18:00:00',
  status VARCHAR(50) DEFAULT 'active',
  carbon_footprint DECIMAL(8, 2) DEFAULT 0,
  amenities JSON,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_location (location),
  INDEX idx_status (status)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  resource_id INT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed',
  booking_purpose VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_resource_id (resource_id),
  INDEX idx_booking_date (booking_date),
  INDEX idx_status (status),
  UNIQUE KEY unique_booking (resource_id, booking_date, start_time)
);

-- Usage logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id SERIAL PRIMARY KEY,
  resource_id INT NOT NULL,
  booking_id INT,
  user_id INT,
  duration_minutes INT,
  energy_consumed DECIMAL(8, 2),
  carbon_equivalent DECIMAL(8, 2),
  occupancy_count INT,
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_resource_id (resource_id),
  INDEX idx_logged_at (logged_at)
);

-- Sustainability metrics table
CREATE TABLE IF NOT EXISTS sustainability_metrics (
  id SERIAL PRIMARY KEY,
  metric_date DATE NOT NULL UNIQUE,
  total_energy_saved DECIMAL(10, 2) DEFAULT 0,
  total_carbon_reduced DECIMAL(10, 2) DEFAULT 0,
  total_bookings INT DEFAULT 0,
  average_utilization DECIMAL(5, 2) DEFAULT 0,
  peak_hour VARCHAR(5),
  most_used_resource_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_metric_date (metric_date),
  FOREIGN KEY (most_used_resource_id) REFERENCES resources(id) ON DELETE SET NULL
);

-- Eco points (gamification) table
CREATE TABLE IF NOT EXISTS eco_points (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  points INT DEFAULT 0,
  reason VARCHAR(255),
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_earned_at (earned_at)
);

-- Achievements/badges table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  badge_name VARCHAR(100) NOT NULL,
  description TEXT,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  UNIQUE KEY unique_achievement (user_id, badge_name)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read)
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(logged_at);
