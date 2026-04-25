package com.example.BusbookingSys.repository;


import com.example.BusbookingSys.entity.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {
    
    @Query("SELECT bs FROM BusSchedule bs WHERE bs.travelDate = :travelDate AND bs.availableSeats > 0")
    List<BusSchedule> findByTravelDate(@Param("travelDate") LocalDate travelDate);
    
    List<BusSchedule> findByBusId(Long busId);
    
    List<BusSchedule> findByRouteId(Long routeId);
    
    @Query("SELECT bs FROM BusSchedule bs WHERE bs.travelDate = :date AND bs.availableSeats > 0")
    List<BusSchedule> findAvailableSchedulesByDate(@Param("date") LocalDate date);
}