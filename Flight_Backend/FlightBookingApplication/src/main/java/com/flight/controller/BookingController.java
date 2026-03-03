package com.flight.controller;

import com.flight.dto.request.BookingRequest;
import com.flight.dto.response.BookingResponse;
import com.flight.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> bookFlight(
            Authentication authentication,
            @Valid @RequestBody BookingRequest request) {

        String email = authentication.getName();
        BookingResponse response =
                bookingService.bookFlight(email, request);

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getUserBookings(
            Authentication authentication) {

        String email = authentication.getName();
        return ResponseEntity.ok(
                bookingService.getUserBookings(email)
        );
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }
}