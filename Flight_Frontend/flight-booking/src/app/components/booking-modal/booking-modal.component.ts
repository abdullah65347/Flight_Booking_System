import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../models/flight.model';
import { BookingService } from '../../services/booking.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-modal.component.html'
})
export class BookingModalComponent {
  @Input({ required: true }) flight!: Flight;
  @Output() close = new EventEmitter<void>();

  seats = 1;
  loading = signal(false);
  confirmed = signal(false);
  bookingCode = signal('');

  constructor(
    private bookingService: BookingService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) { }

  decrement(): void { if (this.seats > 1) this.seats--; }
  increment(): void { if (this.seats < this.flight.availableSeats) this.seats++; }

  confirmBooking(): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.warning('Please login to book a flight');
      this.close.emit();
      this.router.navigate(['/login']);
      return;
    }
    this.loading.set(true);
    this.bookingService.bookFlight({ flightId: this.flight.id, numberOfSeats: this.seats }).subscribe({
      next: (b) => {
        this.loading.set(false);
        this.confirmed.set(true);
        this.bookingCode.set(b.bookingCode);
        this.toastService.success('Flight booked successfully!', b.bookingCode);
      },
      error: (err) => {
        this.loading.set(false);
        this.toastService.error('Booking failed', err?.error?.message || 'Please try again');
      }
    });
  }

  formatTime(dt: string): string {
    return new Date(dt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(dt: string): string {
    return new Date(dt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
