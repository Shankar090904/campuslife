# Campus Resource Orchestrator - Frontend

React + Vite frontend application for the Campus Resource Orchestrator system.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── ResourceCard.jsx
│   └── BookingForm.jsx
├── pages/               # Page-level components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Resources.jsx
│   ├── Booking.jsx
│   ├── Analytics.jsx
│   └── Admin.jsx
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   ├── useResources.js
│   └── useBookings.js
├── services/            # API service layer
│   ├── api.js           # Axios instance
│   ├── authService.js
│   ├── resourceService.js
│   └── bookingService.js
├── context/             # React Context
│   └── AuthContext.jsx
├── styles/              # Global styles
│   └── index.css
├── utils/               # Utility functions
│   ├── constants.js
│   └── helpers.js
├── App.jsx              # Main App component
└── main.jsx             # Entry point
```

## 🎨 Pages Overview

### 1. Login Page
- User login form
- Registration option
- Password recovery

### 2. Dashboard
- Upcoming bookings
- Quick actions
- Resource suggestions
- Activity feed

### 3. Browse Resources
- Resource listing
- Filters (type, capacity, location)
- Search functionality
- Resource details modal

### 4. Make Booking
- Calendar interface
- Time slot selection
- Booking confirmation
- Sustainability tips

### 5. Analytics
- Resource utilization charts
- Sustainability metrics
- Booking trends
- User statistics

### 6. Admin Panel
- User management
- Resource management
- Booking approvals
- System settings

## 🔐 Authentication

Uses JWT tokens stored in localStorage.

### Protected Routes
- Only authenticated users can access most pages
- Admin-only pages require admin role
- Redirect to login if token is invalid/expired

## 📡 API Integration

All API calls go through `services/api.js`:

```javascript
import api from './services/api';

// Example: Get resources
const response = await api.get('/resources');

// Example: Create booking
const response = await api.post('/bookings', bookingData);
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Mobile-responsive** design
- **Dark mode** support (optional)
- **Custom theme** in `tailwind.config.js`

## 📊 Components

### ResourceCard
Displays a single resource with:
- Name, type, location
- Capacity, availability
- Booking button

### BookingForm
Collects booking information:
- Resource selection
- Date/time picker
- Purpose field
- Confirmation

### AnalyticsChart
Displays various charts:
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions

## 🚀 Building for Production

```bash
npm run build
```

Production build will be in `dist/` folder.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker
```bash
docker build -t cro-web:latest .
docker run -p 5173:5173 cro-web:latest
```

## 🔧 Configuration

Edit `.env` to configure:
- API endpoint
- App name and version
- Feature flags
- Debug mode

## 🎯 Best Practices

- Use React hooks for state management
- Keep components small and reusable
- Use custom hooks for API calls
- Implement error boundaries
- Add loading states
- Handle errors gracefully

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Recharts Documentation](https://recharts.org/)

---

**Last Updated**: 2026-04-24
