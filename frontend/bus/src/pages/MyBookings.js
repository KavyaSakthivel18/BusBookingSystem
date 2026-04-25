import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaTicketAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';
import { formatDate, formatCurrency, getBusTypeColor } from '../utils/helpers';

const MyBookings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, user?.id]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getBookingsByUser(user?.id);
      setBookings(response.data.data || []);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.cancelBooking(bookingId);
        setBookings(bookings.filter(b => b.id !== bookingId));
        alert('Booking cancelled successfully');
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
            <FaTicketAlt className="text-blue-600" /> My Bookings
          </h1>
          <p className="text-gray-600 mt-2">View and manage your bus tickets</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {!loading && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="md:flex">
                  {/* Left Section - Journey Info */}
                  <div className="md:flex-1 p-6 border-r-4 border-blue-500">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <FaTicketAlt className="text-blue-600 text-2xl" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Booking ID</p>
                          <p className="text-lg font-bold text-gray-800">#{booking.id}</p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    {/* Journey Details */}
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">From</p>
                        <p className="text-xl font-bold text-gray-800">Mumbai</p>
                      </div>
                      <div className="text-gray-400 text-2xl">
                        <FaArrowRight />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">To</p>
                        <p className="text-xl font-bold text-gray-800">Delhi</p>
                      </div>
                    </div>

                    {/* Travel Details */}
                    <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                          <FaCalendarAlt /> Travel Date
                        </p>
                        <p className="text-gray-800 font-semibold">{formatDate(booking.travelDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Booking Date</p>
                        <p className="text-gray-800 font-semibold">{formatDate(booking.bookingDate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions & Amount */}
                  <div className="md:w-48 p-6 flex flex-col justify-between bg-gray-50 border-t md:border-t-0 md:border-l">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Total Amount</p>
                      <p className="text-3xl font-bold text-blue-600 mb-2">{formatCurrency(booking.totalAmount)}</p>
                      <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 mt-4">
                      <button
                        onClick={() => alert('Ticket details: Your e-ticket has been sent to your email')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition text-sm"
                      >
                        View Ticket
                      </button>
                      {booking.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-bold py-2 rounded-lg transition text-sm flex items-center justify-center gap-2"
                        >
                          <FaTrash /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any bookings. Start your journey today!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Book a Bus
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyBookings;
