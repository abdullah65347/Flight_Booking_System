package com.flight.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    private Long id;
    private String bookingCode;
    private String flightNumber;
    private String source;
    private String destination;

    private Integer numberOfSeats;
    private LocalDateTime bookingDate;

    private String userName;
    private String userEmail;
}