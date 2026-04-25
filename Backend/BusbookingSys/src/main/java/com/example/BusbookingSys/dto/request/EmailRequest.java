package com.example.BusbookingSys.dto.request;

import lombok.Data;

@Data
public class EmailRequest {
    private String to;
    private String subject;
    private String body;
}