// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

// Format time
export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
};

// Validate email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate phone
export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

// Get seat color based on status
export const getSeatColor = (seatStatus) => {
  switch (seatStatus) {
    case 'available':
      return 'bg-green-500';
    case 'booked':
      return 'bg-red-500';
    case 'selected':
      return 'bg-blue-500';
    default:
      return 'bg-gray-300';
  }
};

// Calculate distance and fare
export const calculateFare = (distance, basePrice = 5) => {
  return Math.round(distance * basePrice);
};

// Get bus type badge color
export const getBusTypeColor = (busType) => {
  switch (busType?.toUpperCase()) {
    case 'AC':
      return 'bg-blue-100 text-blue-800';
    case 'NON-AC':
      return 'bg-yellow-100 text-yellow-800';
    case 'SLEEPER':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Local storage helpers
export const storage = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
