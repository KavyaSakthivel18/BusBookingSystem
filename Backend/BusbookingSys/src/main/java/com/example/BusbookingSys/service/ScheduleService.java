package com.example.BusbookingSys.service;

import com.example.BusbookingSys.dto.request.ScheduleRequestDTO;
import com.example.BusbookingSys.dto.request.SearchRequestDTO;
import com.example.BusbookingSys.dto.response.ScheduleResponseDTO;
import com.example.BusbookingSys.dto.response.SearchResponseDTO;
import java.util.List;

public interface ScheduleService {
    
    // Schedule Management
    ScheduleResponseDTO createSchedule(ScheduleRequestDTO request);
    
    List<ScheduleResponseDTO> getAllSchedules();
    
    ScheduleResponseDTO getScheduleById(Long id);
    
    ScheduleResponseDTO updateSchedule(Long id, ScheduleRequestDTO request);
    
    void deleteSchedule(Long id);
    
    // Search Functionality
    List<SearchResponseDTO> searchBuses(SearchRequestDTO searchRequest);
    
    // Business Logic
    boolean checkAvailability(Long scheduleId, int requiredSeats);
    
    void updateAvailableSeats(Long scheduleId, int seatsBooked);
}
