package com.example.BusbookingSys.service.serviceImpl;


import com.example.BusbookingSys.dto.request.EmailRequest;
import com.example.BusbookingSys.service.NotificationService;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Override
    public void sendEmail(EmailRequest request) {

        // Simulated email sending
        System.out.println("Sending Email...");
        System.out.println("To: " + request.getTo());
        System.out.println("Subject: " + request.getSubject());
        System.out.println("Body: " + request.getBody());
    }
}