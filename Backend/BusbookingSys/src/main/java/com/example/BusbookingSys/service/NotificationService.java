package com.example.BusbookingSys.service;


import com.example.BusbookingSys.dto.request.EmailRequest;

public interface NotificationService {

    void sendEmail(EmailRequest request);
}
