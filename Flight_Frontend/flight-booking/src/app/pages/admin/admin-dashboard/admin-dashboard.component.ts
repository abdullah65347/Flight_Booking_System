import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FlightService } from '../../../services/flight.service';
import { BookingService } from '../../../services/booking.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  stats = signal<any[]>([]);

  quickLinks = [
    { label: 'Manage Flights', path: '/admin/flights', icon: '✈️', bg: 'bg-brand-50 dark:bg-brand-950', desc: 'Add, edit, delete flights' },
    { label: 'Manage Users', path: '/admin/users', icon: '👥', bg: 'bg-purple-50 dark:bg-purple-950', desc: 'View and manage users' },
    { label: 'All Bookings', path: '/admin/bookings', icon: '📋', bg: 'bg-emerald-50 dark:bg-emerald-950', desc: 'Monitor all bookings' },
  ];

  constructor(
    private flightService: FlightService,
    private bookingService: BookingService,
    private userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    Promise.all([
      this.flightService.getAllFlights().toPromise().catch(() => []),
      this.bookingService.getAllBookings().toPromise().catch(() => []),
      this.userService.getAllUsers().toPromise().catch(() => []),
    ]).then(([flights, bookings, users]) => {
      this.stats.set([
        { label: 'Total Flights', value: (flights as any[])?.length ?? 0, icon: '✈️', bg: 'bg-brand-50 dark:bg-brand-950', sub: 'Active routes' },
        { label: 'Total Bookings', value: (bookings as any[])?.length ?? 0, icon: '🎫', bg: 'bg-emerald-50 dark:bg-emerald-950', sub: 'All time' },
        { label: 'Total Users', value: (users as any[])?.length ?? 0, icon: '👥', bg: 'bg-purple-50 dark:bg-purple-950', sub: 'Registered' },
      ]);
    });
  }
}
