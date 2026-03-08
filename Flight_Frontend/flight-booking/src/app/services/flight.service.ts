import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight, AddFlightRequest } from '../models/flight.model';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private baseUrl = 'http://localhost:8080/api/flights';

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.baseUrl);
  }

  searchFlights(source: string, destination: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/search`, {
      params: { source, destination }
    });
  }

  addFlight(flight: AddFlightRequest): Observable<Flight> {
    return this.http.post<Flight>(this.baseUrl, flight);
  }

  updateFlight(id: number, flight: AddFlightRequest): Observable<Flight> {
    return this.http.put<Flight>(`${this.baseUrl}/${id}`, flight);
  }

  deleteFlight(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
