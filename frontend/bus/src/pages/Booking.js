import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRupeeSign } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, getBusTypeColor } from '../utils/helpers';
import SeatSelector from '../components/SeatSelector';

const Booking = () => {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, proceedToCheckout, searchCriteria } = useBooking();

  if (!selectedBus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No bus selected</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back to Search
          </button>
        </div>
      </div>
    );
  }

  const farePerSeat = 350;
  const totalFare = selectedSeats.length * farePerSeat;
  const taxes = Math.round(totalFare * 0.05);
  const totalAmount = totalFare + taxes;

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const bookingDetails = {
      bus: selectedBus,
      seats: selectedSeats,
      fare: totalFare,
      taxes: taxes,
      totalAmount: totalAmount,
      searchCriteria,
    };

    proceedToCheckout(bookingDetails);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            <FaArrowLeft /> Back to Search
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Complete Your Booking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              {/* Bus Info */}
              <div className="mb-6 pb-6 border-b-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedBus.busName}</h2>
                    <p className="text-gray-600">Bus No: {selectedBus.busNumber}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getBusTypeColor(selectedBus.busType)}`}>
                      {selectedBus.busType}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Route:</p>
                    <p className="text-lg font-bold text-gray-800">{searchCriteria.source} → {searchCriteria.destination}</p>
                    <p className="text-gray-600 text-sm mt-2">Travel Date: {searchCriteria.travelDate}</p>
                  </div>
                </div>
              </div>

              {/* Seat Selector */}
              <SeatSelector busId={selectedBus.id} onSeatsSelected={() => {}} />
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Price Summary</h3>

              {/* Selected Seats */}
              <div className="mb-6 pb-6 border-b-2">
                <p className="text-gray-600 font-semibold mb-2">Selected Seats:</p>
                {selectedSeats.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seat => (
                      <span
                        key={seat}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No seats selected yet</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-semibold">{formatCurrency(farePerSeat)} × {selectedSeats.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-lg">{formatCurrency(totalFare)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Charges (5%)</span>
                  <span className="font-semibold">{formatCurrency(taxes)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6 pb-6 border-b-2">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total Amount</span>
                  <span className="text-3xl font-bold text-blue-600 flex items-center">
                    <FaRupeeSign />
                    {formatCurrency(totalAmount).replace('₹', '')}
                  </span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceedToCheckout}
                disabled={selectedSeats.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedSeats.length > 0 ? 'Proceed to Checkout' : 'Select Seats to Continue'}
              </button>

              {/* Info Box */}
              <div className="mt-4 bg-blue-50 p-3 rounded-lg text-xs text-gray-600">
                <p>💡 Select your seats on the left, then proceed to payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
