import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'
// import Resources from './pages/Resources'
// import Booking from './pages/Booking'
// import Analytics from './pages/Analytics'
// import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center h-screen"><h1 className="text-4xl font-bold text-green-600">Campus Resource Orchestrator</h1></div>} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
