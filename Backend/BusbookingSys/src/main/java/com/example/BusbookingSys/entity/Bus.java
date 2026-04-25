package com.example.BusbookingSys.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String busNumber;

    @Column(nullable = false)
    private String busName;

    @Column(nullable = false)
    private String busType; // e.g., AC, NON-AC, SLEEPER

    @Column(nullable = false)
    private Integer totalSeats;

    @Column(nullable = false)
    private Boolean isActive = true;
}