package com.flight.controller;

import com.flight.dto.request.FlightRequest;
import com.flight.dto.response.FlightResponse;
import com.flight.service.FlightService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {

    private final FlightService flightService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<FlightResponse> addFlight(
            @Valid @RequestBody FlightRequest request) {

        FlightResponse response = flightService.addFlight(request);
        return ResponseEntity.status(201).body(response);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<FlightResponse> updateFlight(
            @PathVariable Long id,
            @Valid @RequestBody FlightRequest request) {

        FlightResponse response = flightService.updateFlight(id, request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFlight(@PathVariable Long id) {

        flightService.deleteFlight(id);
        return ResponseEntity.ok("Flight deleted successfully");
    }

    @GetMapping
    public ResponseEntity<List<FlightResponse>> getAllFlights() {

        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @GetMapping("/search")
    public ResponseEntity<List<FlightResponse>> searchFlights(
            @RequestParam String source,
            @RequestParam String destination) {

        return ResponseEntity.ok(
                flightService.searchFlights(source, destination)
        );
    }
}