package com.example.BusbookingSys.service;



import com.example.BusbookingSys.dto.request.PaymentRequest;
import com.example.BusbookingSys.dto.response.PaymentResponse;

public interface PaymentService {

    PaymentResponse processPayment(PaymentRequest request);

    PaymentResponse getPaymentByBookingId(Long bookingId);
}
