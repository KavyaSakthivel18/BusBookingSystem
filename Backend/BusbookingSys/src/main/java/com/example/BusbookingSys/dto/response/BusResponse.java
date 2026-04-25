package com.example.BusbookingSys.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusResponse {
    private Long id;
    private String busNumber;
    private String busName;
    private String busType;
    private Integer totalSeats;
    private Boolean isActive;
}
