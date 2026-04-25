package com.example.BusbookingSys.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long scheduleId;

    private LocalDateTime bookingDate;
    private LocalDate travelDate;

    private double totalAmount;
    private String status;
}
