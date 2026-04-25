package com.example.BusbookingSys.service.serviceImpl;
import com.example.BusbookingSys.dto.request.*;
import com.example.BusbookingSys.dto.response.*;
import com.example.BusbookingSys.entity.*;
import com.example.BusbookingSys.exception.*;
import com.example.BusbookingSys.repository.*;
import com.example.BusbookingSys.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;
    private final SeatService seatService;

    @Override
    public Booking createBooking(BookingRequest request) {

        for (TicketRequest t : request.getTickets()) {
            Seat seat = seatService.getSeat(request.getScheduleId(), t.getSeatNumber());

            if (!seat.getIsAvailable()) {
                throw new SeatAlreadyBookedException("Seat already booked: " + t.getSeatNumber());
            }

            seatService.markSeatBooked(seat);
        }

        Booking booking = new Booking();
        booking.setUserId(request.getUserId());
        booking.setScheduleId(request.getScheduleId());
        booking.setBookingDate(LocalDateTime.now());
        booking.setTravelDate(request.getTravelDate());
        booking.setTotalAmount(request.getTotalAmount());
        booking.setStatus("CONFIRMED");

        booking = bookingRepository.save(booking);

        for (TicketRequest t : request.getTickets()) {
            Ticket ticket = new Ticket();
            ticket.setBookingId(booking.getId());
            ticket.setSeatNumber(t.getSeatNumber());
            ticket.setPassengerName(t.getPassengerName());
            ticket.setPassengerAge(t.getPassengerAge());

            ticketRepository.save(ticket);
        }

        return booking;
    }

    @Override
    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public BookingDetailsResponse getBookingDetails(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        List<TicketResponse> tickets = ticketRepository.findByBookingId(bookingId)
                .stream()
                .map(t -> new TicketResponse(
                        t.getSeatNumber(),
                        t.getPassengerName(),
                        t.getPassengerAge()
                ))
                .collect(Collectors.toList());

        return new BookingDetailsResponse(
                booking.getId(),
                booking.getUserId(),
                booking.getScheduleId(),
                booking.getStatus(),
                booking.getTotalAmount(),
                tickets
        );
    }

    @Override
    public void cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        List<Ticket> tickets = ticketRepository.findByBookingId(bookingId);

        for (Ticket t : tickets) {
            Seat seat = seatService.getSeat(booking.getScheduleId(), t.getSeatNumber());
            seatService.releaseSeat(seat);
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }
}
