
package com.example.BusbookingSys.service;
import com.example.BusbookingSys.dto.request.*;
import com.example.BusbookingSys.dto.response.*;
import com.example.BusbookingSys.entity.Booking;

import java.util.List;

public interface BookingService {

    Booking createBooking(BookingRequest request);

    List<Booking> getBookingsByUser(Long userId);

    BookingDetailsResponse getBookingDetails(Long bookingId);

    void cancelBooking(Long bookingId);
}
