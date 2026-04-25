package com.example.BusbookingSys.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PaymentResponse {

    private Long paymentId;
    private Long bookingId;
    private BigDecimal amount;
    private String status;
}
