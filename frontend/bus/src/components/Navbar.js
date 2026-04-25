import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBus, FaUser, FaSignOutAlt, FaHome, FaTicketAlt, FaHistory } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-blue-200 transition">
            <FaBus className="text-3xl" />
            <span>BusBooking</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-200 transition flex items-center gap-2">
              <FaHome /> Home
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/bookings" className="hover:text-blue-200 transition flex items-center gap-2">
                  <FaHistory /> My Bookings
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <FaUser className="text-xl" />
                  <span className="text-sm">{user?.firstName} {user?.lastName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
