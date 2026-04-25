package com.example.BusbookingSys.config;

import com.example.BusbookingSys.entity.User;
import com.example.BusbookingSys.entity.UserRole;
import com.example.BusbookingSys.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeAdmin();
    }

    private void initializeAdmin() {
        String adminEmail = "admin@bbs.in";
        
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin12"));
            admin.setFirstName("System");
            admin.setLastName("Admin");
            admin.setPhoneNumber("0000000000");
            admin.setRole(UserRole.ADMIN);
            admin.setIsActive(true);
            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());
            
            userRepository.save(admin);
            System.out.println("Admin user initialized successfully with email: " + adminEmail);
        }
    }
}
