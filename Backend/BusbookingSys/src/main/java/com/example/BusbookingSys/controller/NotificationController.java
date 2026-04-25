package com.example.BusbookingSys.controller;

import com.example.BusbookingSys.dto.request.EmailRequest;
import com.example.BusbookingSys.dto.response.ApiResponse;
import com.example.BusbookingSys.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/email")
    public ResponseEntity<ApiResponse<String>> sendEmail(
            @RequestBody EmailRequest request) {

        notificationService.sendEmail(request);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Email sent successfully")
                        .data("SENT")
                        .build()
        );
    }
}
