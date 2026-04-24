# Campus Resource Orchestrator (CRO)

A smart system that helps colleges optimize resource allocation and promote sustainable campus practices.

## 🎯 Project Overview

Campus Resource Orchestrator is a comprehensive web-based platform that enables:
- **Smart Resource Management**: Classrooms, labs, meeting rooms, parking, equipment
- **Intelligent Booking System**: Real-time availability, conflict resolution, smart recommendations
- **Sustainability Tracking**: Carbon footprint calculation, eco-friendly scheduling
- **Analytics & Insights**: Resource utilization patterns, peak hour analysis
- **Gamification**: Eco-points, leaderboards, badges for sustainable behavior

## 🏗️ Architecture

```
Frontend (React)          Backend (Node.js)         Database (PostgreSQL)
├── Dashboard             ├── API Routes            ├── Users
├── Booking Interface     ├── Controllers           ├── Resources
├── Resource Listing      ├── Business Logic        ├── Bookings
├── Analytics             ├── Authentication        ├── Usage Logs
└── Admin Panel           └── Middleware            └── Sustainability Metrics
```

## 🚀 Tech Stack

- **Frontend**: React + Tailwind CSS + Recharts
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (or SQLite for local development)
- **Real-time**: Socket.io (optional for live updates)
- **Authentication**: JWT
- **Deployment**: Docker + Docker Compose

## 📁 Project Structure

```
campuslife/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Database & environment config
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── utils/          # Helper functions, algorithms
│   │   └── server.js       # Server entry point
│   ├── .env                # Environment variables
│   ├── .env.example        # Example env file
│   ├── package.json        # Dependencies
│   └── README.md           # Backend documentation
│
├── frontend/                # React Dashboard
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page-level components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── context/         # React Context (Auth, Theme)
│   │   ├── styles/          # Global styles
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   ├── .env.example         # Example env file
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── README.md            # Frontend documentation
│
├── database/                 # Database setup scripts
│   ├── schema.sql           # Database schema
│   ├── seed_data.sql        # Mock data for development
│   └── migrations/          # Database migrations
│
├── docker-compose.yml       # Docker Compose configuration
├── .gitignore              # Git ignore rules
├── LICENSE                 # Project license
└── README.md               # This file
```

## 🎮 Key Features

### 1. **Resource Management**
- Add, edit, delete resources (classrooms, labs, etc.)
- Set availability hours and capacity
- Track resource status (active, maintenance, inactive)

### 2. **Smart Booking System**
- View real-time resource availability
- Book resources without conflicts
- Receive smart recommendations for booking times
- Cancel bookings with notifications

### 3. **Sustainability Features**
- Calculate carbon footprint for each booking
- Recommend off-peak booking times for lower carbon impact
- Track energy consumption
- Eco-points system for sustainable behavior

### 4. **Analytics Dashboard**
- Resource utilization heatmaps
- Peak hour analysis
- Sustainability metrics
- User booking statistics

### 5. **Gamification**
- Eco-points for sustainable bookings
- Leaderboards for eco-conscious users
- Achievement badges
- Weekly sustainability challenges

## 🛠️ Getting Started

### Prerequisites
- Node.js v16+ and npm
- PostgreSQL or SQLite
- Git

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/Shankar090904/campuslife.git
cd campuslife

# Start services with Docker Compose
docker-compose up -d

# Frontend will be available at http://localhost:5173
# Backend API at http://localhost:5000
# Database at localhost:5432
```

### Manual Setup

#### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials

# Run database migrations
npm run migrate

# Seed sample data
npm run seed

# Start the development server
npm run dev
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the development server
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Resource Endpoints
- `GET /api/resources` - List all resources
- `GET /api/resources/:id` - Get resource details
- `POST /api/resources` - Create resource (Admin only)
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Booking Endpoints
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Modify booking
- `DELETE /api/bookings/:id` - Cancel booking

### Analytics Endpoints
- `GET /api/analytics/utilization` - Resource utilization metrics
- `GET /api/analytics/sustainability` - Sustainability metrics
- `GET /api/analytics/dashboard` - Dashboard overview

## 🎨 Frontend Features

### Pages
1. **Login/Register** - User authentication
2. **Dashboard** - Overview of bookings and resources
3. **Browse Resources** - Search and filter resources
4. **Make Booking** - Calendar-based booking interface
5. **Analytics** - Sustainability and utilization dashboards
6. **Admin Panel** - Resource and user management

## 🗄️ Database Schema

### Users Table
- id, name, email, password, role, department, created_at

### Resources Table
- id, name, type, location, capacity, availability_hours, status

### Bookings Table
- id, user_id, resource_id, booking_date, start_time, end_time, status

### Usage Logs Table
- id, resource_id, duration_minutes, energy_consumed, carbon_equivalent

## 📊 Advanced Features

### Smart Algorithms
- **Booking Recommendation Engine**: Suggests best time slots based on occupancy patterns
- **Conflict Resolution**: Automatically handles booking conflicts
- **Sustainability Scoring**: Calculates carbon footprint for each booking
- **Predictive Analytics**: Forecasts peak hours and resource demand

### Sustainability Features
- Carbon footprint calculation
- Energy consumption tracking
- Eco-points gamification system
- Sustainability leaderboards
- Green booking recommendations

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Docker Deployment
```bash
docker-compose build
docker-compose up -d
```

### Cloud Deployment (Heroku/AWS/GCP)
- See `backend/README.md` and `frontend/README.md` for deployment guides

## 📈 Development Roadmap

- [x] Project structure setup
- [ ] Backend API development
- [ ] Frontend UI development
- [ ] Authentication system
- [ ] Booking system
- [ ] Analytics dashboard
- [ ] Sustainability features
- [ ] Gamification system
- [ ] Testing & QA
- [ ] Deployment

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Team Lead**: Shankar090904
- **Members**: [Add team members here]

## 💬 Support & Feedback

For questions or feedback, please create an issue on GitHub.

---

**Last Updated**: 2026-04-24