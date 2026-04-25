package com.example.BusbookingSys.controller;

import com.example.BusbookingSys.dto.*;
import com.example.BusbookingSys.entity.Booking;
import com.example.BusbookingSys.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ApiResponse<Booking> createBooking(@RequestBody BookingRequest request) {
        return new ApiResponse<>(true, "Booking created",
                bookingService.createBooking(request));
    }

    @GetMapping("/{userId}")
    public ApiResponse<List<Booking>> getBookings(@PathVariable Long userId) {
        return new ApiResponse<>(true, "User bookings",
                bookingService.getBookingsByUser(userId));
    }

    // 🔥 REQUIRED API
    @GetMapping("/details/{bookingId}")
    public ApiResponse<BookingDetailsResponse> getBookingDetails(@PathVariable Long bookingId) {
        return new ApiResponse<>(true, "Booking details",
                bookingService.getBookingDetails(bookingId));
    }

    @DeleteMapping("/{bookingId}")
    public ApiResponse<?> cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return new ApiResponse<>(true, "Booking cancelled", null);
    }
}