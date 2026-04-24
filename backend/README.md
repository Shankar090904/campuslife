# Campus Resource Orchestrator - Backend API

Node.js + Express.js REST API for the Campus Resource Orchestrator system.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- PostgreSQL or SQLite
- npm or yarn

### Installation

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration

# Run migrations
npm run migrate

# Seed sample data
npm run seed

# Start development server
npm run dev
```

API will be available at `http://localhost:5000`

## 📁 Project Structure

```
src/
├── config/              # Configuration files
│   ├── database.js      # Database connection
│   └── constants.js     # App constants
├── controllers/         # Request handlers
│   ├── authController.js
│   ├── resourceController.js
│   └── bookingController.js
├─��� models/              # Database models
│   ├── User.js
│   ├── Resource.js
│   └── Booking.js
├── routes/              # API routes
│   ├── auth.js
│   ├── resources.js
│   └── bookings.js
├── middleware/          # Express middleware
│   ├── auth.js          # JWT authentication
│   ├── validation.js    # Input validation
│   └── errorHandler.js  # Error handling
├── utils/               # Helper functions
│   ├── algorithms.js    # Booking algorithms
│   ├── sustainability.js # Sustainability calculations
│   └── validators.js    # Validation helpers
├── database/            # Database scripts
│   ├── migrate.js
│   └── seed.js
└── server.js            # Express app entry point
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How it works:
1. User registers/logs in
2. Server returns JWT token
3. Client includes token in Authorization header
4. Protected routes verify the token

### Example:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
GET    /api/auth/profile       - Get user profile (requires auth)
PUT    /api/auth/profile       - Update profile (requires auth)
```

### Resources
```
GET    /api/resources              - List all resources
GET    /api/resources/:id          - Get resource details
GET    /api/resources/:id/bookings - Get resource's bookings
POST   /api/resources              - Create resource (admin only)
PUT    /api/resources/:id          - Update resource (admin only)
DELETE /api/resources/:id          - Delete resource (admin only)
```

### Bookings
```
GET    /api/bookings              - Get user's bookings
GET    /api/bookings/:id          - Get booking details
POST   /api/bookings              - Create booking
PUT    /api/bookings/:id          - Modify booking
DELETE /api/bookings/:id          - Cancel booking
GET    /api/bookings/availability - Check availability
```

### Analytics
```
GET    /api/analytics/utilization      - Resource utilization
GET    /api/analytics/sustainability   - Sustainability metrics
GET    /api/analytics/dashboard        - Dashboard overview
GET    /api/analytics/reports/:type    - Generate reports
```

## 🗄️ Database Schema

### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('student', 'faculty', 'admin', 'facilities_manager'),
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Resources
```sql
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type ENUM('classroom', 'lab', 'meeting_room', 'parking', 'equipment'),
  location VARCHAR(255),
  capacity INT,
  available_from TIME,
  available_until TIME,
  status ENUM('active', 'maintenance', 'inactive'),
  carbon_footprint DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  resource_id INT NOT NULL,
  booking_date DATE,
  start_time TIME,
  end_time TIME,
  status ENUM('confirmed', 'cancelled', 'completed'),
  booking_purpose VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test authController.test.js

# Run with coverage
npm test -- --coverage
```

## 📊 Smart Algorithms

### 1. Booking Recommendation
Suggests best booking times based on:
- Resource occupancy patterns
- User preferences
- Sustainability goals (off-peak = greener)

### 2. Conflict Resolution
- Checks for overlapping bookings
- Suggests alternatives
- Handles priority-based resolution

### 3. Sustainability Scoring
Calculates carbon footprint:
- Base: Resource type
- Time: Off-peak hours = lower carbon
- Duration: Shorter = better
- Sharing: Multiple users = better

## 🚀 Deployment

### Docker
```bash
cd backend
docker build -t cro-api:latest .
docker run -p 5000:5000 -e DATABASE_URL=postgresql://... cro-api:latest
```

### Heroku
```bash
heroku create cro-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### AWS/GCP/Azure
See deployment guides in the docs folder.

## 🔧 Configuration

Edit `.env` file to configure:
- Database connection
- JWT secret
- SMTP settings
- API endpoints
- Logging level

## 📝 Code Standards

- Use ES6+ syntax
- Follow Express conventions
- Add JSDoc comments for functions
- Handle errors properly
- Validate all inputs
- Use middleware for common tasks

## 🤝 Contributing

1. Create a feature branch
2. Write tests for new features
3. Ensure tests pass
4. Submit a pull request

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Documentation](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Last Updated**: 2026-04-24
