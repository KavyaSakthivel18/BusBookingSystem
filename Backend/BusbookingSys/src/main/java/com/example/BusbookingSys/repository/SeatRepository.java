package com.example.BusbookingSys.repository;

// public class SeatRepository {
    
// }

import com.example.BusbookingSys.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByScheduleId(Long scheduleId);

    Seat findByScheduleIdAndSeatNumber(Long scheduleId, String seatNumber);
}