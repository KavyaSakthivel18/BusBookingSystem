package com.example.BusbookingSys.controller;

import com.example.BusbookingSys.dto.response.ScheduleResponseDTO;
import com.example.BusbookingSys.dto.request.ScheduleRequestDTO;
import com.example.BusbookingSys.dto.request.SearchRequestDTO;
import com.example.BusbookingSys.dto.response.SearchResponseDTO;
import com.example.BusbookingSys.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ScheduleController {
    
    @Autowired
    private ScheduleService scheduleService;  // Using interface, not implementation
    
    private Map<String, Object> createResponse(boolean success, String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", message);
        response.put("data", data);
        return response;
    }
    
    @PostMapping("/schedules")
    public ResponseEntity<Map<String, Object>> createSchedule(@RequestBody ScheduleRequestDTO request) {
        ScheduleResponseDTO schedule = scheduleService.createSchedule(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(createResponse(true, "Schedule created successfully", schedule));
    }
    
    @GetMapping("/schedules")
    public ResponseEntity<Map<String, Object>> getAllSchedules() {
        List<ScheduleResponseDTO> schedules = scheduleService.getAllSchedules();
        return ResponseEntity.ok(createResponse(true, "Schedules retrieved successfully", schedules));
    }
    
    @GetMapping("/schedules/{id}")
    public ResponseEntity<Map<String, Object>> getScheduleById(@PathVariable Long id) {
        ScheduleResponseDTO schedule = scheduleService.getScheduleById(id);
        return ResponseEntity.ok(createResponse(true, "Schedule retrieved successfully", schedule));
    }
    
    @PutMapping("/schedules/{id}")
    public ResponseEntity<Map<String, Object>> updateSchedule(
            @PathVariable Long id,
            @RequestBody ScheduleRequestDTO request) {
        ScheduleResponseDTO schedule = scheduleService.updateSchedule(id, request);
        return ResponseEntity.ok(createResponse(true, "Schedule updated successfully", schedule));
    }
    
    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<Map<String, Object>> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.ok(createResponse(true, "Schedule deleted successfully", null));
    }
    
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchBuses(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam String date) {
        
        SearchRequestDTO searchRequest = new SearchRequestDTO();
        searchRequest.setSource(source);
        searchRequest.setDestination(destination);
        searchRequest.setTravelDate(java.time.LocalDate.parse(date));
        
        List<SearchResponseDTO> results = scheduleService.searchBuses(searchRequest);
        return ResponseEntity.ok(createResponse(true, "Search completed successfully", results));
    }
    
    // Additional endpoint for Member 4 to check availability
    @GetMapping("/schedules/{scheduleId}/availability")
    public ResponseEntity<Map<String, Object>> checkAvailability(
            @PathVariable Long scheduleId,
            @RequestParam int seats) {
        
        boolean available = scheduleService.checkAvailability(scheduleId, seats);
        String message = available ? "Seats available" : "Seats not available";
        return ResponseEntity.ok(createResponse(true, message, available));
    }
}