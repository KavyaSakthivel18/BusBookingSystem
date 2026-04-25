import React, { useState, useEffect } from 'react';
import { FaChair } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';

const SeatSelector = ({ busId, onSeatsSelected }) => {
  const { selectedSeats, toggleSeat } = useBooking();
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Generate seats (6 columns x 10 rows)
    const generatedSeats = [];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    for (let row = 1; row <= 10; row++) {
      for (let col = 0; col < 6; col++) {
        const seatNumber = `${columns[col]}${row}`;
        const isBooked = Math.random() > 0.7; // 30% chance of being booked
        const isSelected = selectedSeats.includes(seatNumber);
        
        generatedSeats.push({
          number: seatNumber,
          isBooked,
          isSelected,
        });
      }
    }
    setSeats(generatedSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seatNumber) => {
    const seat = seats.find(s => s.number === seatNumber);
    if (!seat.isBooked) {
      toggleSeat(seatNumber);
    }
  };

  const getSeatClasses = (seat) => {
    let classes = 'w-10 h-10 m-1 rounded cursor-pointer transition transform hover:scale-110 flex items-center justify-center text-xs font-bold border-2 ';
    
    if (seat.isBooked) {
      classes += 'bg-red-400 border-red-600 text-white cursor-not-allowed';
    } else if (seat.isSelected) {
      classes += 'bg-blue-500 border-blue-700 text-white shadow-lg scale-110';
    } else {
      classes += 'bg-green-400 border-green-600 text-white hover:bg-green-500';
    }
    
    return classes;
  };

  const rows = [];
  for (let i = 0; i < seats.length; i += 6) {
    rows.push(seats.slice(i, i + 6));
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your Seats</h2>
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-400 rounded border-2 border-green-600"></div>
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded border-2 border-blue-700"></div>
            <span className="text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-400 rounded border-2 border-red-600"></div>
            <span className="text-gray-700">Booked</span>
          </div>
        </div>
      </div>

      {/* Screen */}
      <div className="text-center mb-8">
        <div className="inline-block border-4 border-gray-400 rounded-full px-12 py-2 bg-gray-300 text-gray-700 font-bold">
          🎬 SCREEN
        </div>
      </div>

      {/* Seats Layout */}
      <div className="flex flex-col items-center gap-2 mb-6">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-2">
            <span className="w-4 text-center font-bold text-gray-600">{String.fromCharCode(65 + rowIdx)}</span>
            <div className="flex">
              {row.map((seat) => (
                <button
                  key={seat.number}
                  onClick={() => handleSeatClick(seat.number)}
                  className={getSeatClasses(seat)}
                  disabled={seat.isBooked}
                  title={seat.number}
                >
                  {seat.number.charAt(1)}
                </button>
              ))}
            </div>
            <span className="w-4 text-center font-bold text-gray-600">{String.fromCharCode(65 + rowIdx)}</span>
          </div>
        ))}
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
          <p className="text-gray-700 font-semibold">
            Selected Seats: <span className="text-blue-600 font-bold text-lg">{selectedSeats.join(', ')}</span>
          </p>
          <p className="text-gray-600 text-sm mt-2">Total Seats: {selectedSeats.length}</p>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;
