

package com.example.BusbookingSys.dto.request;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class BookingRequest {

    private Long userId;
    private Long scheduleId;
    private LocalDate travelDate;
    private double totalAmount;

    private List<TicketRequest> tickets;
}
