import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBus, FaUser, FaSignOutAlt, FaHome, FaHistory, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-blue-200 transition">
            <FaBus className="text-3xl" />
            <span>BusBooking</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-200 transition flex items-center gap-2">
              <FaHome /> Home
            </Link>
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link to="/admin" className="hover:text-blue-200 transition flex items-center gap-2 font-bold">
                <FaBus /> Admin Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === 'USER' && (
              <Link to="/bookings" className="hover:text-blue-200 transition flex items-center gap-2">
                <FaHistory /> My Bookings
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaUser className="text-xl" />
                  <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-md"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg transition font-bold shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-400 px-6 py-2 rounded-lg transition font-bold shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none p-2"
            >
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-blue-500 animate-fade-in-down">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-blue-700 px-4 py-2 rounded transition flex items-center gap-3"
              >
                <FaHome /> Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'ADMIN' ? (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:bg-blue-700 px-4 py-2 rounded transition flex items-center gap-3 font-bold"
                    >
                      <FaBus /> Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/bookings"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:bg-blue-700 px-4 py-2 rounded transition flex items-center gap-3"
                    >
                      <FaHistory /> My Bookings
                    </Link>
                  )}
                  <div className="px-4 py-2 flex items-center gap-3 border-t border-blue-500 mt-2 pt-4">
                    <FaUser />
                    <span className="text-sm">{user?.firstName} {user?.lastName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mx-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-4 pt-2 border-t border-blue-500 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition font-bold text-center shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition font-bold text-center shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
