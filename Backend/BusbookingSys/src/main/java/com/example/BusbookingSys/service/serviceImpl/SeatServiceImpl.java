package com.example.BusbookingSys.service.serviceImpl;

import com.example.BusbookingSys.entity.Seat;
import com.example.BusbookingSys.exception.ResourceNotFoundException;
import com.example.BusbookingSys.repository.SeatRepository;
import com.example.BusbookingSys.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

    private final SeatRepository seatRepository;

    @Override
    public List<Seat> getSeatsBySchedule(Long scheduleId) {
        return seatRepository.findByScheduleId(scheduleId);
    }

    @Override
    public Seat getSeat(Long scheduleId, String seatNumber) {

        Seat seat = seatRepository.findByScheduleIdAndSeatNumber(scheduleId, seatNumber);

        if (seat == null) {
            throw new ResourceNotFoundException("Seat not found");
        }

        return seat;
    }

    @Override
    public void markSeatBooked(Seat seat) {

        if (!seat.getIsAvailable()) {
            throw new RuntimeException("Seat already booked");
        }

        seat.setIsAvailable(false);
        seatRepository.save(seat);
    }

    @Override
    public void releaseSeat(Seat seat) {
        seat.setIsAvailable(true);
        seatRepository.save(seat);
    }
}