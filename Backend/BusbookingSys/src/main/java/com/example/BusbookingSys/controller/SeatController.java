package com.example.BusbookingSys.controller;

import com.example.BusbookingSys.dto.ApiResponse;
import com.example.BusbookingSys.entity.Seat;
import com.example.BusbookingSys.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;

    @GetMapping("/{scheduleId}")
    public ApiResponse<List<Seat>> getSeats(@PathVariable Long scheduleId) {
        return new ApiResponse<>(true, "Seats fetched",
                seatService.getSeatsBySchedule(scheduleId));
    }
}