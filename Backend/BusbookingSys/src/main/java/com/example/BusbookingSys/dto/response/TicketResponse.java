package com.example.BusbookingSys.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponse {

    private String seatNumber;
    private String passengerName;
    private int passengerAge;
}
