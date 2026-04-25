package com.example.BusbookingSys.service.serviceImpl;

import com.example.BusbookingSys.dto.request.BusRequest;
import com.example.BusbookingSys.dto.response.BusResponse;
import com.example.BusbookingSys.entity.Bus;
import com.example.BusbookingSys.exception.DuplicateResourceException;
import com.example.BusbookingSys.exception.ResourceNotFoundException;
import com.example.BusbookingSys.repository.BusRepository;
import com.example.BusbookingSys.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusServiceImpl implements BusService {

    private final BusRepository busRepository;

    @Override
    public BusResponse createBus(BusRequest request) {
        if (busRepository.existsByBusNumber(request.getBusNumber())) {
            throw new DuplicateResourceException("Bus with number " + request.getBusNumber() + " already exists");
        }

        Bus bus = Bus.builder()
                .busNumber(request.getBusNumber())
                .busName(request.getBusName())
                .busType(request.getBusType())
                .totalSeats(request.getTotalSeats())
                .isActive(true)
                .build();

        return mapToResponse(busRepository.save(bus));
    }

    @Override
    public List<BusResponse> getAllBuses() {
        return busRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BusResponse getBusById(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + id));
        return mapToResponse(bus);
    }

    @Override
    public BusResponse updateBus(Long id, BusRequest request) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + id));

        bus.setBusName(request.getBusName());
        bus.setBusType(request.getBusType());
        bus.setTotalSeats(request.getTotalSeats());

        return mapToResponse(busRepository.save(bus));
    }

    @Override
    public void deleteBus(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + id));
        bus.setIsActive(false);      // soft delete — keep the record
        busRepository.save(bus);
    }

    private BusResponse mapToResponse(Bus bus) {
        return BusResponse.builder()
                .id(bus.getId())
                .busNumber(bus.getBusNumber())
                .busName(bus.getBusName())
                .busType(bus.getBusType())
                .totalSeats(bus.getTotalSeats())
                .isActive(bus.getIsActive())
                .build();
    }
}