package com.flight.service;

import com.flight.dto.request.FlightRequest;
import com.flight.dto.response.FlightResponse;

import java.util.List;

public interface FlightService {

    FlightResponse addFlight(FlightRequest request);

    FlightResponse updateFlight(Long id, FlightRequest request);

    void deleteFlight(Long id);

    List<FlightResponse> getAllFlights();

    List<FlightResponse> searchFlights(String source, String destination);
}