package com.flight.service.impl;

import com.flight.dto.request.FlightRequest;
import com.flight.dto.response.FlightResponse;
import com.flight.entity.Flight;
import com.flight.exception.ResourceNotFoundException;
import com.flight.mapper.FlightMapper;
import com.flight.repository.FlightRepository;
import com.flight.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightServiceImpl implements FlightService {

    private final FlightRepository flightRepository;

    @Override
    public FlightResponse addFlight(FlightRequest request) {

        Flight flight = FlightMapper.toEntity(request);
        flightRepository.save(flight);

        return FlightMapper.toResponse(flight);
    }

    @Override
    public FlightResponse updateFlight(Long id, FlightRequest request) {

        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));

        flight.setFlightNumber(request.getFlightNumber());
        flight.setSource(request.getSource());
        flight.setDestination(request.getDestination());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setArrivalTime(request.getArrivalTime());
        flight.setPrice(request.getPrice());
        flight.setAvailableSeats(request.getAvailableSeats());

        flightRepository.save(flight);

        return FlightMapper.toResponse(flight);
    }

    @Override
    public void deleteFlight(Long id) {

        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));

        flightRepository.delete(flight);
    }

    @Override
    public List<FlightResponse> getAllFlights() {

        return flightRepository.findAll()
                .stream()
                .map(FlightMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<FlightResponse> searchFlights(String source, String destination) {

        return flightRepository.findBySourceAndDestination(source, destination)
                .stream()
                .map(FlightMapper::toResponse)
                .collect(Collectors.toList());
    }
}