import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, getBusTypeColor } from '../utils/helpers';
import { bookingAPI, paymentAPI } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { bookingDetails, resetBooking } = useBooking();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No booking details found</p>
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

  const validateCardData = () => {
    const newErrors = {};

    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!cardData.cardHolder.trim()) {
      newErrors.cardHolder = 'Card holder name is required';
    }
    if (!cardData.expiry || !cardData.expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Invalid expiry format (MM/YY)';
    }
    if (!cardData.cvv || cardData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    if (name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
    }

    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateCardData()) return;

    setIsProcessing(true);

    try {
      // Step 1: Create booking
      const bookingRequest = {
        userId: user.id,
        scheduleId: bookingDetails.bus.id,
        travelDate: bookingDetails.searchCriteria.travelDate,
        totalAmount: bookingDetails.totalAmount,
        status: 'CONFIRMED',
      };

      const bookingResponse = await bookingAPI.createBooking(bookingRequest);
      const newBookingId = bookingResponse.data.data.id;
      setBookingId(newBookingId);

      // Step 2: Process payment
      const paymentRequest = {
        bookingId: newBookingId,
        amount: bookingDetails.totalAmount,
        paymentStatus: 'SUCCESS',
        paymentMethod: paymentMethod,
      };

      await paymentAPI.processPayment(paymentRequest);

      setPaymentSuccess(true);
    } catch (error) {
      alert('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your bus tickets have been successfully booked</p>

          <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2"><strong>Booking ID:</strong> #{bookingId}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Seats:</strong> {bookingDetails.seats.join(', ')}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Total Amount:</strong> {formatCurrency(bookingDetails.totalAmount)}</p>
            <p className="text-sm text-gray-600"><strong>Bus:</strong> {bookingDetails.bus.busName}</p>
          </div>

          <button
            onClick={() => {
              resetBooking();
              navigate('/');
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/booking')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            <FaArrowLeft /> Back to Booking
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Complete Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {['card', 'upi', 'netbanking'].map((method) => (
                    <label key={method} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                      style={{
                        borderColor: paymentMethod === method ? '#2563eb' : '#e5e7eb',
                        backgroundColor: paymentMethod === method ? '#eff6ff' : 'transparent',
                      }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-800 font-semibold capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePayment} className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                    <div className="flex items-center border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
                      <FaCreditCard className="text-gray-400 mx-3" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="flex-1 py-2 px-2 outline-none"
                      />
                    </div>
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>

                  {/* Card Holder */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Card Holder Name</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={cardData.cardHolder}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      className="w-full border-2 border-gray-300 rounded-lg focus-within:border-blue-500 py-2 px-3 outline-none"
                    />
                    {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        className="w-full border-2 border-gray-300 rounded-lg focus-within:border-blue-500 py-2 px-3 outline-none"
                      />
                      {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                      <div className="flex items-center border-2 border-gray-300 rounded-lg focus-within:border-blue-500">
                        <FaLock className="text-gray-400 mx-3" />
                        <input
                          type="text"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          className="flex-1 py-2 px-2 outline-none"
                        />
                      </div>
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 mt-6"
                  >
                    {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                  </button>
                </form>
              )}

              {paymentMethod !== 'card' && (
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Payment...' : 'Proceed with ' + paymentMethod.toUpperCase()}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>

              {/* Bus Details */}
              <div className="mb-6 pb-6 border-b-2">
                <h4 className="font-bold text-gray-800 mb-2">{bookingDetails.bus.busName}</h4>
                <p className="text-sm text-gray-600 mb-1">Bus No: {bookingDetails.bus.busNumber}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getBusTypeColor(bookingDetails.bus.busType)}`}>
                  {bookingDetails.bus.busType}
                </span>
              </div>

              {/* Journey Details */}
              <div className="mb-6 pb-6 border-b-2">
                <p className="text-sm text-gray-600 mb-1">
                  <strong>From:</strong> {bookingDetails.searchCriteria.source}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>To:</strong> {bookingDetails.searchCriteria.destination}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {bookingDetails.searchCriteria.travelDate}
                </p>
              </div>

              {/* Seats */}
              <div className="mb-6 pb-6 border-b-2">
                <p className="text-sm font-semibold text-gray-800 mb-2">Seats:</p>
                <div className="flex flex-wrap gap-2">
                  {bookingDetails.seats.map(seat => (
                    <span key={seat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6 pb-6 border-b-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Fare</span>
                  <span>{formatCurrency(bookingDetails.fare)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span>{formatCurrency(bookingDetails.taxes)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-gray-800">Total</span>
                  <span className="text-blue-600">{formatCurrency(bookingDetails.totalAmount)}</span>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="bg-blue-50 p-3 rounded text-sm">
                <p className="text-gray-600 mb-1"><strong>Passenger:</strong></p>
                <p className="text-gray-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-gray-600 text-xs mt-1">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
