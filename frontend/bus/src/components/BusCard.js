import React from 'react';
import { FaStar, FaUsers, FaChair, FaClock, FaRupeeSign } from 'react-icons/fa';
import { formatCurrency, getBusTypeColor } from '../utils/helpers';

const BusCard = ({ bus, onSelect }) => {
  const rating = Math.floor(Math.random() * 3) + 3; // Random rating 3-5
  const availableSeats = Math.floor(Math.random() * 20) + 5;
  const fare = formatCurrency(Math.floor(Math.random() * 500) + 300);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 border-l-4 border-blue-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Bus Info */}
        <div>
          <h3 className="font-bold text-lg text-gray-800">{bus.busName}</h3>
          <p className="text-gray-600 text-sm">Bus No: {bus.busNumber}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getBusTypeColor(bus.busType)}`}>
            {bus.busType}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaChair className="text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Seats</p>
              <p className="font-bold text-gray-800">{bus.totalSeats}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Available</p>
              <p className="font-bold text-green-600">{availableSeats}</p>
            </div>
          </div>
        </div>

        {/* Rating & Price */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <FaStar className="text-yellow-400" />
            <span className="font-bold text-gray-800">{rating}.0</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-600">
            <FaRupeeSign className="text-lg" />
            <span>{fare.replace('₹', '')}</span>
          </div>
        </div>

        {/* Select Button */}
        <div className="text-right">
          <button
            onClick={() => onSelect(bus)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105"
          >
            Select Bus
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusCard;
