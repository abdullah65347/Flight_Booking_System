package com.flight.mapper;

import com.flight.dto.response.BookingResponse;
import com.flight.entity.Booking;

public class BookingMapper {

    public static BookingResponse toResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getFlight().getFlightNumber(),
                booking.getNumberOfSeats(),
                booking.getBookingDate()
        );
    }
}