import React, { useState, useEffect } from 'react';
import { FaBus, FaRoute, FaPlus, FaTrash, FaCheck, FaTimes, FaMapMarkerAlt, FaRoad, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { routeAPI, busAPI } from '../services/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Route Form State
  const [routeForm, setRouteForm] = useState({
    source: '',
    destination: '',
    distanceKm: '',
    estimatedDurationMinutes: ''
  });

  // Bus Form State
  const [busForm, setBusForm] = useState({
    busName: '',
    busNumber: '',
    busType: 'AC_SLEEPER',
    totalSeats: 30
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'routes') {
        const res = await routeAPI.getAllRoutes();
        setRoutes(res.data.data || []);
      } else {
        const res = await busAPI.getAllBuses();
        setBuses(res.data.data || []);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleRouteChange = (e) => {
    setRouteForm({ ...routeForm, [e.target.name]: e.target.value });
  };

  const handleBusChange = (e) => {
    setBusForm({ ...busForm, [e.target.name]: e.target.value });
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await routeAPI.createRoute(routeForm);
      setSuccess('Route added successfully!');
      setRouteForm({ source: '', destination: '', distanceKm: '', estimatedDurationMinutes: '' });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add route');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await busAPI.createBus(busForm);
      setSuccess('Bus added successfully!');
      setBusForm({ busName: '', busNumber: '', busType: 'AC_SLEEPER', totalSeats: 30 });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add bus');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Manage your fleet and routes</p>
            </div>
            
            <div className="flex bg-gray-700/50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('routes')}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition ${activeTab === 'routes' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
              >
                <FaRoute /> Routes
              </button>
              <button
                onClick={() => setActiveTab('buses')}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition ${activeTab === 'buses' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
              >
                <FaBus /> Buses
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Status Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center gap-3 rounded-r-lg animate-fade-in">
                <FaCheck /> {success}
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-r-lg animate-shake">
                <FaTimes /> {error}
              </div>
            )}

            {activeTab === 'routes' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Route Form */}
                <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaPlus className="text-blue-600" /> Add New Route
                  </h2>
                  <form onSubmit={handleAddRoute} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Source</label>
                      <input
                        type="text"
                        name="source"
                        value={routeForm.source}
                        onChange={handleRouteChange}
                        placeholder="e.g. Chennai"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        value={routeForm.destination}
                        onChange={handleRouteChange}
                        placeholder="e.g. Bangalore"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Distance (km)</label>
                      <input
                        type="number"
                        name="distanceKm"
                        value={routeForm.distanceKm}
                        onChange={handleRouteChange}
                        placeholder="e.g. 350"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Duration (minutes)</label>
                      <input
                        type="number"
                        name="estimatedDurationMinutes"
                        value={routeForm.estimatedDurationMinutes}
                        onChange={handleRouteChange}
                        placeholder="e.g. 360"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform active:scale-95 disabled:opacity-50"
                    >
                      {loading ? 'Adding...' : 'Save Route'}
                    </button>
                  </form>
                </div>

                {/* Routes Table */}
                <div className="lg:col-span-2 overflow-x-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Existing Routes</h2>
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                      <tr>
                        <th className="px-4 py-3 font-bold">Source</th>
                        <th className="px-4 py-3 font-bold">Destination</th>
                        <th className="px-4 py-3 font-bold text-center">Distance</th>
                        <th className="px-4 py-3 font-bold text-center">Duration</th>
                        <th className="px-4 py-3 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {routes.map((route) => (
                        <tr key={route.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-4 font-medium">{route.source}</td>
                          <td className="px-4 py-4 font-medium">{route.destination}</td>
                          <td className="px-4 py-4 text-center">{route.distanceKm} km</td>
                          <td className="px-4 py-4 text-center">{route.estimatedDurationMinutes} min</td>
                          <td className="px-4 py-4 text-center">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
                          </td>
                        </tr>
                      ))}
                      {routes.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-10 text-center text-gray-500 italic">No routes found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Bus Form */}
                <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaPlus className="text-blue-600" /> Add New Bus
                  </h2>
                  <form onSubmit={handleAddBus} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Bus Name</label>
                      <input
                        type="text"
                        name="busName"
                        value={busForm.busName}
                        onChange={handleBusChange}
                        placeholder="e.g. Luxury Express"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Bus Number</label>
                      <input
                        type="text"
                        name="busNumber"
                        value={busForm.busNumber}
                        onChange={handleBusChange}
                        placeholder="e.g. TN-01-AB-1234"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Bus Type</label>
                      <select
                        name="busType"
                        value={busForm.busType}
                        onChange={handleBusChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="AC_SLEEPER">AC Sleeper</option>
                        <option value="NON_AC_SLEEPER">Non-AC Sleeper</option>
                        <option value="AC_SEATER">AC Seater</option>
                        <option value="NON_AC_SEATER">Non-AC Seater</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Total Seats</label>
                      <input
                        type="number"
                        name="totalSeats"
                        value={busForm.totalSeats}
                        onChange={handleBusChange}
                        placeholder="e.g. 30"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform active:scale-95 disabled:opacity-50"
                    >
                      {loading ? 'Adding...' : 'Save Bus'}
                    </button>
                  </form>
                </div>

                {/* Buses Table */}
                <div className="lg:col-span-2 overflow-x-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Available Buses</h2>
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                      <tr>
                        <th className="px-4 py-3 font-bold">Name & Number</th>
                        <th className="px-4 py-3 font-bold">Type</th>
                        <th className="px-4 py-3 font-bold text-center">Seats</th>
                        <th className="px-4 py-3 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {buses.map((bus) => (
                        <tr key={bus.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-4">
                            <p className="font-bold">{bus.busName}</p>
                            <p className="text-xs text-gray-500">{bus.busNumber}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                              {bus.busType.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center font-medium">{bus.totalSeats}</td>
                          <td className="px-4 py-4 text-center">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
                          </td>
                        </tr>
                      ))}
                      {buses.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-4 py-10 text-center text-gray-500 italic">No buses found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
