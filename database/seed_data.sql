-- Insert sample users
INSERT INTO users (name, email, password, role, department) VALUES
('John Doe', 'john@example.com', 'hashed_password_1', 'student', 'Computer Science'),
('Jane Smith', 'jane@example.com', 'hashed_password_2', 'faculty', 'Engineering'),
('Admin User', 'admin@example.com', 'hashed_password_3', 'admin', 'Administration'),
('Facilities Manager', 'facilities@example.com', 'hashed_password_4', 'facilities_manager', 'Facilities');

-- Insert sample resources
INSERT INTO resources (name, type, location, capacity, description, available_from, available_until, status, carbon_footprint) VALUES
('Room 101', 'classroom', 'Building A, Floor 1', 50, 'Standard classroom with projector', '08:00:00', '18:00:00', 'active', 2.5),
('Room 102', 'classroom', 'Building A, Floor 1', 40, 'Classroom with interactive board', '08:00:00', '18:00:00', 'active', 2.3),
('Lab 201', 'lab', 'Building B, Floor 2', 30, 'Computer lab with 30 workstations', '08:00:00', '17:00:00', 'active', 5.0),
('Lab 202', 'lab', 'Building B, Floor 2', 25, 'Science lab with equipment', '08:00:00', '17:00:00', 'active', 4.8),
('Meeting Room A', 'meeting_room', 'Building C, Floor 1', 15, 'Small meeting room for 15 people', '09:00:00', '18:00:00', 'active', 1.2),
('Meeting Room B', 'meeting_room', 'Building C, Floor 1', 25, 'Large meeting room for 25 people', '09:00:00', '18:00:00', 'active', 1.8),
('Parking Zone A', 'parking', 'Campus Parking Lot A', 200, 'Surface parking area A', '06:00:00', '22:00:00', 'active', 0.5),
('Equipment Room', 'equipment', 'Building A, Floor 3', 10, 'Projectors, cameras, audio equipment', '08:00:00', '17:00:00', 'active', 0.8);

-- Insert sample bookings
INSERT INTO bookings (user_id, resource_id, booking_date, start_time, end_time, status, booking_purpose) VALUES
(1, 1, '2026-04-25', '10:00:00', '12:00:00', 'confirmed', 'Database class'),
(1, 1, '2026-04-26', '14:00:00', '16:00:00', 'confirmed', 'Project presentation'),
(2, 3, '2026-04-25', '09:00:00', '11:00:00', 'confirmed', 'Programming lab'),
(2, 5, '2026-04-26', '15:00:00', '16:00:00', 'confirmed', 'Department meeting'),
(3, 2, '2026-04-27', '10:00:00', '12:00:00', 'confirmed', 'Seminar'),
(4, 4, '2026-04-25', '08:00:00', '10:00:00', 'confirmed', 'Maintenance check');

-- Insert sample usage logs
INSERT INTO usage_logs (resource_id, booking_id, user_id, duration_minutes, energy_consumed, carbon_equivalent, occupancy_count) VALUES
(1, 1, 1, 120, 15.5, 2.3, 45),
(1, 2, 1, 120, 15.2, 2.2, 40),
(3, 3, 2, 120, 25.0, 3.8, 30),
(5, 4, 2, 60, 8.5, 1.3, 12),
(2, 5, 3, 120, 18.5, 2.8, 35),
(4, 6, 4, 120, 22.0, 3.3, 25);

-- Insert sample sustainability metrics
INSERT INTO sustainability_metrics (metric_date, total_energy_saved, total_carbon_reduced, total_bookings, average_utilization, peak_hour, most_used_resource_id) VALUES
('2026-04-24', 104.7, 16.7, 6, 75.5, '10:00', 1),
('2026-04-23', 98.2, 14.9, 5, 72.3, '11:00', 3),
('2026-04-22', 112.5, 17.1, 7, 78.9, '09:00', 1);

-- Insert sample eco points
INSERT INTO eco_points (user_id, points, reason) VALUES
(1, 50, 'Booked during off-peak hours'),
(1, 30, 'Shared booking with 3 other students'),
(2, 40, 'Early morning booking (less energy)'),
(2, 25, 'Resource sharing initiative'),
(3, 100, 'Admin bonus for system maintenance');

-- Insert sample achievements
INSERT INTO achievements (user_id, badge_name, description) VALUES
(1, 'Green Booker', 'Made 10 eco-friendly bookings'),
(1, 'Resource Sharer', 'Shared resources with 5+ users'),
(2, 'Early Bird', 'Booked resources before 9 AM'),
(3, 'Sustainability Champion', 'Earned 100+ eco-points');
