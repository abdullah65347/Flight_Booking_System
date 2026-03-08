import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule, LoaderComponent, EmptyStateComponent],
  templateUrl: './manage-bookings.component.html'
})
export class ManageBookingsComponent implements OnInit {
  bookings = signal<Booking[]>([]);
  loading = signal(true);

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe({
      next: b => { this.bookings.set(b); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  formatDate(dt: string): string {
    return new Date(dt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
