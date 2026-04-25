package com.example.BusbookingSys.service;

import com.example.BusbookingSys.dto.request.UserLoginRequest;
import com.example.BusbookingSys.dto.request.UserRegistrationRequest;
import com.example.BusbookingSys.dto.response.LoginResponse;
import com.example.BusbookingSys.dto.response.UserResponse;

public interface AuthService {
    
    UserResponse register(UserRegistrationRequest request);
    
    LoginResponse login(UserLoginRequest request);
    
    UserResponse getUserById(Long id);
    
    UserResponse getUserByEmail(String email);
}