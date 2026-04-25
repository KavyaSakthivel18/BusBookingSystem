import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getUserById: (id) => api.get(`/auth/users/${id}`),
  getUserByEmail: (email) => api.get(`/auth/users/email/${email}`),
};

// Bus APIs
export const busAPI = {
  getAllBuses: () => api.get('/buses'),
  getBusById: (id) => api.get(`/buses/${id}`),
  createBus: (data) => api.post('/buses', data),
  updateBus: (id, data) => api.put(`/buses/${id}`, data),
  deleteBus: (id) => api.delete(`/buses/${id}`),
};

// Route APIs
export const routeAPI = {
  getAllRoutes: () => api.get('/routes'),
  getRouteById: (id) => api.get(`/routes/${id}`),
  createRoute: (data) => api.post('/routes', data),
};

// Booking APIs
export const bookingAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getBookingsByUser: (userId) => api.get(`/bookings/${userId}`),
  getBookingDetails: (bookingId) => api.get(`/bookings/details/${bookingId}`),
  cancelBooking: (bookingId) => api.delete(`/bookings/${bookingId}`),
};

// Seat APIs
export const seatAPI = {
  getSeatsBySchedule: (scheduleId) => api.get(`/seats/${scheduleId}`),
};

// Payment APIs
export const paymentAPI = {
  processPayment: (data) => api.post('/payments', data),
  getPaymentByBookingId: (bookingId) => api.get(`/payments/${bookingId}`),
};

// Notification APIs
export const notificationAPI = {
  sendNotification: (data) => api.post('/notifications', data),
};

export default api;
