package com.example.BusbookingSys.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteResponse {
    private Long id;
    private String source;
    private String destination;
    private Double distanceKm;
    private Integer estimatedDurationMinutes;
    private Boolean isActive;
}