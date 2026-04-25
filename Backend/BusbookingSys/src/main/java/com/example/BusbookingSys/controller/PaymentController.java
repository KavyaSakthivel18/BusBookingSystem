package com.example.BusbookingSys.controller;

import com.example.BusbookingSys.dto.request.PaymentRequest;
import com.example.BusbookingSys.dto.response.ApiResponse;
import com.example.BusbookingSys.dto.response.PaymentResponse;
import com.example.BusbookingSys.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentResponse>> createPayment(
            @RequestBody PaymentRequest request) {

        PaymentResponse response = paymentService.processPayment(request);

        return ResponseEntity.status(201).body(
                ApiResponse.<PaymentResponse>builder()
                        .success(true)
                        .message("Payment processed successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPayment(
            @PathVariable Long bookingId) {

        PaymentResponse response = paymentService.getPaymentByBookingId(bookingId);

        return ResponseEntity.ok(
                ApiResponse.<PaymentResponse>builder()
                        .success(true)
                        .message("Payment fetched successfully")
                        .data(response)
                        .build()
        );
    }
}
