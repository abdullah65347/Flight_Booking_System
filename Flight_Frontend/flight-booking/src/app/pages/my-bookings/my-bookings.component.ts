import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { ToastService } from '../../services/toast.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent, LoaderComponent, EmptyStateComponent],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-dark-950 page-enter">
      <div class="bg-white dark:bg-dark-900 border-b border-slate-200 dark:border-slate-700/50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 class="font-display font-bold text-3xl text-slate-900 dark:text-white">My Bookings</h1>
          <p class="text-slate-500 mt-1">{{ bookings().length }} booking(s) found</p>
        </div>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        @if (loading()) {
          <app-loader message="Loading your bookings..." />
        } @else if (bookings().length === 0) {
          <app-empty-state
            title="No bookings yet"
            message="You haven't booked any flights. Start exploring flights!"
            icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        } @else {
          <div class="space-y-4 animate-stagger">
            @for (b of bookings(); track b.bookingCode) {
              <div class="card p-5 hover:shadow-glow-sm transition-all duration-200">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <span class="badge-blue font-mono text-xs">{{ b.bookingCode }}</span>
                      <span class="badge-green text-xs">Confirmed</span>
                    </div>

                    <div class="flex items-center gap-4">
                      <div>
                        <div class="font-display font-bold text-lg text-slate-900 dark:text-white">{{ b.source || '—' }}</div>
                        <div class="text-xs text-slate-400">{{ b.departureTime ? formatTime(b.departureTime) : '' }}</div>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="h-px w-8 bg-slate-200 dark:bg-slate-600"></div>
                        <svg class="w-4 h-4 text-brand-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <div class="h-px w-8 bg-slate-200 dark:bg-slate-600"></div>
                      </div>
                      <div>
                        <div class="font-display font-bold text-lg text-slate-900 dark:text-white">{{ b.destination || '—' }}</div>
                        <div class="text-xs text-slate-400">{{ b.arrivalTime ? formatTime(b.arrivalTime) : '' }}</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span>✈️ {{ b.flightNumber }}</span>
                      <span>💺 {{ b.numberOfSeats }} seat(s)</span>
                      <span>📅 {{ formatDate(b.bookingDate) }}</span>
                    </div>
                  </div>

                  <button (click)="cancelTarget.set(b)" class="btn-danger text-xs self-start sm:self-center">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    Cancel
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>

    @if (cancelTarget()) {
      <app-confirmation-modal
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This cannot be undone."
        confirmLabel="Yes, Cancel"
        (confirm)="cancelBooking()"
        (cancel)="cancelTarget.set(null)" />
    }
  `
})
export class MyBookingsComponent implements OnInit {
  bookings = signal<Booking[]>([]);
  loading = signal(true);
  cancelTarget = signal<Booking | null>(null);

  constructor(private bookingService: BookingService, private toast: ToastService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.bookingService.getUserBookings().subscribe({
      next: (b) => { this.bookings.set(b); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  cancelBooking(): void {
    const booking = this.cancelTarget();
    if (!booking?.id) { this.cancelTarget.set(null); return; }
    this.bookingService.cancelBooking(booking.id).subscribe({
      next: () => {
        this.toast.success('Booking cancelled');
        this.cancelTarget.set(null);
        this.load();
      },
      error: () => { this.toast.error('Failed to cancel booking'); this.cancelTarget.set(null); }
    });
  }

  formatTime(dt: string): string {
    return new Date(dt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(dt: string): string {
    return new Date(dt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
