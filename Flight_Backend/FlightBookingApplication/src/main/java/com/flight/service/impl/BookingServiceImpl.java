package com.flight.service.impl;

import com.flight.dto.request.BookingRequest;
import com.flight.dto.response.BookingResponse;
import com.flight.entity.Booking;
import com.flight.entity.Flight;
import com.flight.entity.User;
import com.flight.exception.BadRequestException;
import com.flight.exception.ResourceNotFoundException;
import com.flight.mapper.BookingMapper;
import com.flight.repository.BookingRepository;
import com.flight.repository.FlightRepository;
import com.flight.repository.UserRepository;
import com.flight.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;
    private final UserRepository userRepository;

    @Override
    public BookingResponse bookFlight(String email, BookingRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Flight flight = flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));

        if (flight.getAvailableSeats() < request.getNumberOfSeats()) {
            throw new BadRequestException("Not enough seats available");
        }

        flight.setAvailableSeats(
                flight.getAvailableSeats() - request.getNumberOfSeats()
        );

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setNumberOfSeats(request.getNumberOfSeats());
        booking.setBookingDate(LocalDateTime.now());

        bookingRepository.save(booking);
        flightRepository.save(flight);

        return BookingMapper.toResponse(booking);
    }

    @Override
    public List<BookingResponse> getUserBookings(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return bookingRepository.findByUserId(user.getId())
                .stream()
                .map(BookingMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BookingResponse> getAllBookings() {

        return bookingRepository.findAll()
                .stream()
                .map(BookingMapper::toResponse)
                .collect(Collectors.toList());
    }
}