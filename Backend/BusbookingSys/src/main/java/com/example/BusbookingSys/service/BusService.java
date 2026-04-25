package com.example.BusbookingSys.service;

import com.example.BusbookingSys.dto.request.BusRequest;
import com.example.BusbookingSys.dto.response.BusResponse;

import java.util.List;

public interface BusService {
    BusResponse createBus(BusRequest request);
    List<BusResponse> getAllBuses();
    BusResponse getBusById(Long id);
    BusResponse updateBus(Long id, BusRequest request);
    void deleteBus(Long id);
}