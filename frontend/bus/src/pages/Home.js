import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaBus, FaTrophy, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { routeAPI, busAPI } from '../services/api';
import BusCard from '../components/BusCard';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { updateSearchCriteria, selectBus } = useBooking();

  const [searchParams, setSearchParams] = useState({
    source: '',
    destination: '',
    travelDate: '',
  });

  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [routesRes, busesRes] = await Promise.all([
        routeAPI.getAllRoutes(),
        busAPI.getAllBuses(),
      ]);
      setRoutes(routesRes.data.data || []);
      setBuses(busesRes.data.data || []);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchParams.source || !searchParams.destination || !searchParams.travelDate) {
      setError('Please fill all fields');
      return;
    }

    if (searchParams.source === searchParams.destination) {
      setError('Source and destination cannot be same');
      return;
    }

    // Mock search - filter buses
    updateSearchCriteria(searchParams);
    const mockResults = buses.slice(0, Math.floor(Math.random() * 3) + 2);
    setSearchResults(mockResults);
    setError('');
  };

  const handleSelectBus = (bus) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    selectBus(bus);
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Safe & Comfortable Bus Travels</h1>
          <p className="text-xl text-blue-100">Book your tickets online and enjoy hassle-free journey</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 -mt-6 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Buses</h2>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Source */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">From</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
                <FaMapMarkerAlt className="text-gray-400 mx-3" />
                <select
                  name="source"
                  value={searchParams.source}
                  onChange={handleInputChange}
                  className="flex-1 py-2 px-2 outline-none"
                >
                  <option value="">Select source</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.source}>{route.source}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">To</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
                <FaMapMarkerAlt className="text-gray-400 mx-3" />
                <select
                  name="destination"
                  value={searchParams.destination}
                  onChange={handleInputChange}
                  className="flex-1 py-2 px-2 outline-none"
                >
                  <option value="">Select destination</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.destination}>{route.destination}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Travel Date</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
                <FaCalendarAlt className="text-gray-400 mx-3" />
                <input
                  type="date"
                  name="travelDate"
                  value={searchParams.travelDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex-1 py-2 px-2 outline-none"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                <FaSearch /> Search
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </section>

      {/* Search Results */}
      {searchResults && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Available Buses ({searchResults.length})
          </h2>
          <div className="space-y-4">
            {searchResults.length > 0 ? (
              searchResults.map(bus => (
                <BusCard
                  key={bus.id}
                  bus={bus}
                  onSelect={handleSelectBus}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <FaBus className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No buses available for selected route</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {!searchResults && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
              <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">Get the best deals on bus tickets across all routes</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
              <FaShieldAlt className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your travel and payment are completely secure with us</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
              <FaBus className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your tickets in just 3 simple steps</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
