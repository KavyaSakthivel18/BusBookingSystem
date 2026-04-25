import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    source: '',
    destination: '',
    travelDate: '',
  });
  
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Search, 2: Select Seats, 3: Checkout

  const updateSearchCriteria = (criteria) => {
    setSearchCriteria(criteria);
  };

  const selectBus = (bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    setCurrentStep(2);
  };

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) => 
      prev.includes(seatNumber) 
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const clearSeats = () => {
    setSelectedSeats([]);
  };

  const proceedToCheckout = (details) => {
    setBookingDetails(details);
    setCurrentStep(3);
  };

  const resetBooking = () => {
    setSearchCriteria({ source: '', destination: '', travelDate: '' });
    setSelectedBus(null);
    setSelectedSeats([]);
    setBookingDetails(null);
    setCurrentStep(1);
  };

  const value = {
    searchCriteria,
    selectedBus,
    selectedSeats,
    bookingDetails,
    currentStep,
    updateSearchCriteria,
    selectBus,
    toggleSeat,
    clearSeats,
    proceedToCheckout,
    resetBooking,
    setCurrentStep,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};
