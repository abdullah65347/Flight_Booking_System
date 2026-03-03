package com.flight.service;

import com.flight.dto.request.BookingRequest;
import com.flight.dto.response.BookingResponse;

import java.util.List;

public interface BookingService {

    BookingResponse bookFlight(String email, BookingRequest request);

    List<BookingResponse> getUserBookings(String email);
    
    List<BookingResponse> getAllBookings();
}