package com.example.BusbookingSys.repository;

import com.example.BusbookingSys.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findBySourceAndDestination(String source, String destination);
    boolean existsBySourceAndDestination(String source, String destination);
}