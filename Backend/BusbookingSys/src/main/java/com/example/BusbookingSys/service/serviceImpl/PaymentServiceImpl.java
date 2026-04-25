package com.example.BusbookingSys.service.serviceImpl;

import com.example.BusbookingSys.dto.request.PaymentRequest;
import com.example.BusbookingSys.dto.response.PaymentResponse;
import com.example.BusbookingSys.entity.Payment;
import com.example.BusbookingSys.exception.PaymentFailedException;
import com.example.BusbookingSys.repository.PaymentRepository;
import com.example.BusbookingSys.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {

        // Simulated payment logic
        String status = "SUCCESS";

        if (request.getAmount().doubleValue() <= 0) {
            throw new PaymentFailedException("Invalid payment amount");
        }

        Payment payment = Payment.builder()
                .bookingId(request.getBookingId())
                .amount(request.getAmount())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(status)
                .build();

        Payment saved = paymentRepository.save(payment);

        return PaymentResponse.builder()
                .paymentId(saved.getId())
                .bookingId(saved.getBookingId())
                .amount(saved.getAmount())
                .status(saved.getPaymentStatus())
                .build();
    }

    @Override
    public PaymentResponse getPaymentByBookingId(Long bookingId) {

        Payment payment = paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new PaymentFailedException("Payment not found"));

        return PaymentResponse.builder()
                .paymentId(payment.getId())
                .bookingId(payment.getBookingId())
                .amount(payment.getAmount())
                .status(payment.getPaymentStatus())
                .build();
    }
}