package com.example.BusbookingSys.service.serviceImpl;

import com.example.BusbookingSys.dto.request.RouteRequest;
import com.example.BusbookingSys.dto.response.RouteResponse;
import com.example.BusbookingSys.entity.Route;
import com.example.BusbookingSys.exception.DuplicateResourceException;
import com.example.BusbookingSys.exception.ResourceNotFoundException;
import com.example.BusbookingSys.repository.RouteRepository;
import com.example.BusbookingSys.service.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;

    @Override
    public RouteResponse createRoute(RouteRequest request) {
        if (routeRepository.existsBySourceAndDestination(request.getSource(), request.getDestination())) {
            throw new DuplicateResourceException(
                "Route from " + request.getSource() + " to " + request.getDestination() + " already exists"
            );
        }

        Route route = Route.builder()
                .source(request.getSource())
                .destination(request.getDestination())
                .distanceKm(request.getDistanceKm())
                .estimatedDurationMinutes(request.getEstimatedDurationMinutes())
                .isActive(true)
                .build();

        return mapToResponse(routeRepository.save(route));
    }

    @Override
    public List<RouteResponse> getAllRoutes() {
        return routeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RouteResponse getRouteById(Long id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + id));
        return mapToResponse(route);
    }

    private RouteResponse mapToResponse(Route route) {
        return RouteResponse.builder()
                .id(route.getId())
                .source(route.getSource())
                .destination(route.getDestination())
                .distanceKm(route.getDistanceKm())
                .estimatedDurationMinutes(route.getEstimatedDurationMinutes())
                .isActive(route.getIsActive())
                .build();
    }
}