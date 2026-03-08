package com.flight.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {

    @NotNull
    private Long flightId;

    @Positive
    private Integer numberOfSeats;
}