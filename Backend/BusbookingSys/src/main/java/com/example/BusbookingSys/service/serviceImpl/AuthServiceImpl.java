package com.example.BusbookingSys.service.serviceImpl;

import com.example.BusbookingSys.dto.request.UserRegistrationRequest;
import com.example.BusbookingSys.dto.request.UserLoginRequest;
import com.example.BusbookingSys.dto.response.UserResponse;
import com.example.BusbookingSys.dto.response.LoginResponse;
import com.example.BusbookingSys.entity.User;
import com.example.BusbookingSys.entity.UserRole;
import com.example.BusbookingSys.exception.EmailAlreadyExistsException;
import com.example.BusbookingSys.exception.InvalidCredentialsException;
import com.example.BusbookingSys.exception.UserNotFoundException;
import com.example.BusbookingSys.repository.UserRepository;
import com.example.BusbookingSys.service.AuthService;
import com.example.BusbookingSys.config.JwtUtility;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtility jwtUtility;
    
    @Override
    public UserResponse register(UserRegistrationRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered: " + request.getEmail());
        }
        
        // Check if phone number already exists
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new EmailAlreadyExistsException("Phone number already registered: " + request.getPhoneNumber());
        }
        
        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(UserRole.USER);
        user.setIsActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        User savedUser = userRepository.save(user);
        
        return mapToUserResponse(savedUser);
    }
    
    @Override
    public LoginResponse login(UserLoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));
        
        // Check if user is active
        if (!user.getIsActive()) {
            throw new InvalidCredentialsException("User account is inactive");
        }
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        
        // Generate JWT token
        String token = jwtUtility.generateToken(user.getId(), user.getEmail());
        
        // Create login response
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUser(mapToUserResponse(user));
        response.setMessage("Login successful");
        
        return response;
    }
    
    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
        return mapToUserResponse(user);
    }
    
    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return mapToUserResponse(user);
    }
    
    // Helper method to convert User entity to UserResponse DTO
    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getIsActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}