package com.flight.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    private Long id;
    private String flightNumber;
    private Integer numberOfSeats;
    private LocalDateTime bookingDate;
}