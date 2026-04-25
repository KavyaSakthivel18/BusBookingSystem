package com.example.BusbookingSys.service;

import com.example.BusbookingSys.entity.Seat;

import java.util.List;

public interface SeatService {

    List<Seat> getSeatsBySchedule(Long scheduleId);

    Seat getSeat(Long scheduleId, String seatNumber);

    void markSeatBooked(Seat seat);

    void releaseSeat(Seat seat);
}
