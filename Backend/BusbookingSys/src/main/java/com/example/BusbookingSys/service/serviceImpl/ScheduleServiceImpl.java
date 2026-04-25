package com.example.BusbookingSys.service.serviceImpl;

import com.example.BusbookingSys.dto.request.ScheduleRequestDTO;
import com.example.BusbookingSys.dto.request.SearchRequestDTO;
import com.example.BusbookingSys.dto.response.ScheduleResponseDTO;
import com.example.BusbookingSys.dto.response.SearchResponseDTO;
import com.example.BusbookingSys.entity.BusSchedule;
import com.example.BusbookingSys.entity.Bus;
import com.example.BusbookingSys.entity.Route;
import com.example.BusbookingSys.exception.ResourceNotFoundException;
import com.example.BusbookingSys.repository.BusScheduleRepository;
import com.example.BusbookingSys.repository.BusRepository;
import com.example.BusbookingSys.repository.RouteRepository;
import com.example.BusbookingSys.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService {
    
    @Autowired
    private BusScheduleRepository scheduleRepository;
    
    @Autowired
    private BusRepository busRepository;
    
    @Autowired
    private RouteRepository routeRepository;
    
    @Override
    public ScheduleResponseDTO createSchedule(ScheduleRequestDTO request) {
        // Verify bus exists
        Bus bus = busRepository.findById(request.getBusId())
            .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + request.getBusId()));
        
        // Verify route exists
        Route route = routeRepository.findById(request.getRouteId())
            .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + request.getRouteId()));
        
        // Check for duplicate schedule
        boolean exists = scheduleRepository.findAll().stream()
            .anyMatch(s -> s.getBusId().equals(request.getBusId()) && 
                          s.getRouteId().equals(request.getRouteId()) &&
                          s.getTravelDate().equals(request.getTravelDate()));
        
        if (exists) {
            throw new RuntimeException("Schedule already exists for this bus, route, and date");
        }
        
        BusSchedule schedule = new BusSchedule();
        schedule.setBusId(request.getBusId());
        schedule.setRouteId(request.getRouteId());
        schedule.setDepartureTime(request.getDepartureTime());
        schedule.setArrivalTime(request.getArrivalTime());
        schedule.setTravelDate(request.getTravelDate());
        schedule.setAvailableSeats(request.getAvailableSeats());
        
        BusSchedule saved = scheduleRepository.save(schedule);
        return convertToResponseDTO(saved);
    }
    
    @Override
    public List<ScheduleResponseDTO> getAllSchedules() {
        return scheduleRepository.findAll()
            .stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }
    
    @Override
    public ScheduleResponseDTO getScheduleById(Long id) {
        BusSchedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + id));
        return convertToResponseDTO(schedule);
    }
    
    @Override
    public ScheduleResponseDTO updateSchedule(Long id, ScheduleRequestDTO request) {
        BusSchedule existingSchedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + id));
        
        if (request.getBusId() != null) {
            busRepository.findById(request.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + request.getBusId()));
            existingSchedule.setBusId(request.getBusId());
        }
        if (request.getRouteId() != null) {
            routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + request.getRouteId()));
            existingSchedule.setRouteId(request.getRouteId());
        }
        if (request.getDepartureTime() != null) {
            existingSchedule.setDepartureTime(request.getDepartureTime());
        }
        if (request.getArrivalTime() != null) {
            existingSchedule.setArrivalTime(request.getArrivalTime());
        }
        if (request.getTravelDate() != null) {
            existingSchedule.setTravelDate(request.getTravelDate());
        }
        if (request.getAvailableSeats() != null) {
            existingSchedule.setAvailableSeats(request.getAvailableSeats());
        }
        
        BusSchedule updated = scheduleRepository.save(existingSchedule);
        return convertToResponseDTO(updated);
    }
    
    @Override
    public void deleteSchedule(Long id) {
        BusSchedule schedule = scheduleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + id));
        
        scheduleRepository.delete(schedule);
    }
    
    @Override
    public List<SearchResponseDTO> searchBuses(SearchRequestDTO searchRequest) {
        // Validate input
        if (searchRequest.getSource() == null || searchRequest.getSource().trim().isEmpty()) {
            throw new IllegalArgumentException("Source cannot be empty");
        }
        if (searchRequest.getDestination() == null || searchRequest.getDestination().trim().isEmpty()) {
            throw new IllegalArgumentException("Destination cannot be empty");
        }
        
        // Find routes that match source and destination
        List<Route> matchingRoutes = routeRepository.findAll().stream()
            .filter(r -> r.getSource().equalsIgnoreCase(searchRequest.getSource()))
            .filter(r -> r.getDestination().equalsIgnoreCase(searchRequest.getDestination()))
            .collect(Collectors.toList());
        
        if (matchingRoutes.isEmpty()) {
            throw new ResourceNotFoundException("No routes found from " + 
                searchRequest.getSource() + " to " + searchRequest.getDestination());
        }
        
        List<Long> routeIds = matchingRoutes.stream()
            .map(Route::getId)
            .collect(Collectors.toList());
        
        // Find schedules for these routes on the given date with available seats
        LocalDate travelDate = searchRequest.getTravelDate() != null ? 
            searchRequest.getTravelDate() : LocalDate.now();
        
        List<BusSchedule> schedules = scheduleRepository.findAll().stream()
            .filter(s -> routeIds.contains(s.getRouteId()))
            .filter(s -> s.getTravelDate().equals(travelDate))
            .filter(s -> s.getAvailableSeats() > 0)
            .collect(Collectors.toList());
        
        if (schedules.isEmpty()) {
            throw new ResourceNotFoundException(
                String.format("No buses found from %s to %s on %s",
                    searchRequest.getSource(),
                    searchRequest.getDestination(),
                    travelDate)
            );
        }
        
        return schedules.stream()
            .map(this::convertToSearchResponseDTO)
            .collect(Collectors.toList());
    }
    
    @Override
    public boolean checkAvailability(Long scheduleId, int requiredSeats) {
        BusSchedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + scheduleId));
        
        return schedule.getAvailableSeats() >= requiredSeats;
    }
    
    @Override
    @Transactional
    public void updateAvailableSeats(Long scheduleId, int seatsBooked) {
        BusSchedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with id: " + scheduleId));
        
        int currentAvailable = schedule.getAvailableSeats();
        int newAvailable = currentAvailable - seatsBooked;
        
        if (newAvailable < 0) {
            throw new RuntimeException("Not enough seats available. Only " + currentAvailable + " seats left");
        }
        
        schedule.setAvailableSeats(newAvailable);
        scheduleRepository.save(schedule);
    }
    
    // ========== HELPER METHODS ==========
    
    private ScheduleResponseDTO convertToResponseDTO(BusSchedule schedule) {
        ScheduleResponseDTO dto = new ScheduleResponseDTO();
        dto.setId(schedule.getId());
        dto.setBusId(schedule.getBusId());
        dto.setRouteId(schedule.getRouteId());
        dto.setDepartureTime(schedule.getDepartureTime());
        dto.setArrivalTime(schedule.getArrivalTime());
        dto.setTravelDate(schedule.getTravelDate());
        dto.setAvailableSeats(schedule.getAvailableSeats());
        
        // Get bus details
        busRepository.findById(schedule.getBusId()).ifPresent(bus -> {
            dto.setBusNumber(bus.getBusNumber());
            dto.setBusName(bus.getBusName());
        });
        
        // Get route details
        routeRepository.findById(schedule.getRouteId()).ifPresent(route -> {
            dto.setSource(route.getSource());
            dto.setDestination(route.getDestination());
        });
        
        dto.setFare(100.0);
        
        return dto;
    }
    
    private SearchResponseDTO convertToSearchResponseDTO(BusSchedule schedule) {
        SearchResponseDTO dto = new SearchResponseDTO();
        dto.setScheduleId(schedule.getId());
        dto.setDepartureTime(schedule.getDepartureTime());
        dto.setArrivalTime(schedule.getArrivalTime());
        dto.setTravelDate(schedule.getTravelDate());
        dto.setAvailableSeats(schedule.getAvailableSeats());
        
        // Get bus details
        busRepository.findById(schedule.getBusId()).ifPresent(bus -> {
            dto.setBusNumber(bus.getBusNumber());
            dto.setBusName(bus.getBusName());
            dto.setBusType(bus.getBusType());
            // dto.setOperatorName(bus.getOperatorName());
        });
        
        // Get route details
        routeRepository.findById(schedule.getRouteId()).ifPresent(route -> {
            dto.setSource(route.getSource());
            dto.setDestination(route.getDestination());
        });
        
        dto.setFare(100.0);
        
        return dto;
    }
}