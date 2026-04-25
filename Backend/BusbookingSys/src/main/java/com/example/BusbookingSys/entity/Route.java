package com.example.BusbookingSys.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "routes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private Double distanceKm;

    @Column(nullable = false)
    private Integer estimatedDurationMinutes;

    @Column(nullable = false)
    private Boolean isActive = true;
}