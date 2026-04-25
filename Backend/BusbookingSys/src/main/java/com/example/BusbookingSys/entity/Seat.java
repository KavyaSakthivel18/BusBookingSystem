
package com.example.BusbookingSys.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long scheduleId;

    private String seatNumber;
    private String seatType;

    private Boolean isAvailable; // IMPORTANT: use Boolean (not boolean)
}
