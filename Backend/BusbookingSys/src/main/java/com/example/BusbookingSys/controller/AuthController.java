package com.example.BusbookingSys.controller;

import com.example.BusbookingSys.dto.request.*;
import com.example.BusbookingSys.dto.response.*;
import com.example.BusbookingSys.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * Register a new user
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(
            @Valid @RequestBody UserRegistrationRequest request) {
        
        UserResponse userResponse = authService.register(request);
        
        ApiResponse<UserResponse> response = new ApiResponse<>(
                true,
                "User registered successfully",
                userResponse
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * Login user and get JWT token
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody UserLoginRequest request) {
        
        LoginResponse loginResponse = authService.login(request);
        
        ApiResponse<LoginResponse> response = new ApiResponse<>(
                true,
                loginResponse.getMessage(),
                loginResponse
        );
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get user by ID
     * GET /api/auth/users/{id}
     */
    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        
        UserResponse userResponse = authService.getUserById(id);
        
        ApiResponse<UserResponse> response = new ApiResponse<>(
                true,
                "User retrieved successfully",
                userResponse
        );
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get user by email
     * GET /api/auth/users/email/{email}
     */
    @GetMapping("/users/email/{email}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserByEmail(@PathVariable String email) {
        
        UserResponse userResponse = authService.getUserByEmail(email);
        
        ApiResponse<UserResponse> response = new ApiResponse<>(
                true,
                "User retrieved successfully",
                userResponse
        );
        
        return ResponseEntity.ok(response);
    }
}