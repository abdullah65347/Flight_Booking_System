export interface Flight {
  id: number;
  flightCode: string;
  flightNumber: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

export interface FlightSearchParams {
  source?: string;
  destination?: string;
}

export interface AddFlightRequest {
  flightNumber: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}
