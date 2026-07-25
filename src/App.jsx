import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import MarksheetFlow from './MarksheetFlow';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const Header = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
      <header className="app-header">
        <Link to="/" className="brand">
          AI Student Insights
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user ? (
            <>
              {!isDashboard && (
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link nav-link-primary">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
    );
  };

  return (
    <Router>
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard userEmail={user?.email} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marksheet-analysis"
            element={
              <ProtectedRoute>
                <MarksheetFlow />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
