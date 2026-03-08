export interface Booking {
  id?: number;
  bookingCode: string;
  flightNumber: string;
  flightCode?: string;
  source?: string;
  destination?: string;
  departureTime?: string;
  arrivalTime?: string;
  numberOfSeats: number;
  bookingDate: string;
  userId?: number;
  userName?: string;
  userEmail?: string;
  price?: number;
}

export interface BookingRequest {
  flightId: number;
  numberOfSeats: number;
}
