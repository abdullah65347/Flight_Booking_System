package com.flight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.flight.entity.Booking;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    
}