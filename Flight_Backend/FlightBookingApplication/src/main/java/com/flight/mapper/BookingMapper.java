package com.flight.mapper;

import com.flight.dto.response.BookingResponse;
import com.flight.entity.Booking;

public class BookingMapper {

    public static BookingResponse toResponse(Booking booking) {
    	    BookingResponse res = new BookingResponse();

    	    res.setId(booking.getId());
    	    res.setBookingCode("BKNG-" + booking.getId());

    	    res.setFlightNumber(booking.getFlight().getFlightNumber());
    	    res.setSource(booking.getFlight().getSource());
    	    res.setDestination(booking.getFlight().getDestination());

    	    res.setNumberOfSeats(booking.getNumberOfSeats());
    	    res.setBookingDate(booking.getBookingDate());

    	    res.setUserName(booking.getUser().getName());
    	    res.setUserEmail(booking.getUser().getEmail());

    	    return res;
    	}
    }
