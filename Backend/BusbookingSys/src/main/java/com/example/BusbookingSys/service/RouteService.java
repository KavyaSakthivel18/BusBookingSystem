package com.example.BusbookingSys.service;

import com.example.BusbookingSys.dto.request.RouteRequest;
import com.example.BusbookingSys.dto.response.RouteResponse;

import java.util.List;

public interface RouteService {
    RouteResponse createRoute(RouteRequest request);
    List<RouteResponse> getAllRoutes();
    RouteResponse getRouteById(Long id);
}