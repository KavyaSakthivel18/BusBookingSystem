package com.example.BusbookingSys.dto.response;

import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetailsResponse {

    private Long bookingId;
    private Long userId;
    private Long scheduleId;
    private String status;
    private double totalAmount;

    private List<TicketResponse> tickets;
}
