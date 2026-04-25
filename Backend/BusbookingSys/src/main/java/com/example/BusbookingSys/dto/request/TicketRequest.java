package com.example.BusbookingSys.dto.request;

import lombok.Data;

@Data
public class TicketRequest {

    private String seatNumber;
    private String passengerName;
    private int passengerAge;
}
