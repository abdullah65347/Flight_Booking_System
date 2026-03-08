import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { FlightCardComponent } from '../../components/flight-card/flight-card.component';
import { BookingModalComponent } from '../../components/booking-modal/booking-modal.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule, FlightCardComponent, BookingModalComponent, LoaderComponent, EmptyStateComponent],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-dark-950 page-enter">
      <!-- Header -->
      <div class="bg-white dark:bg-dark-900 border-b border-slate-200 dark:border-slate-700/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 class="font-display font-bold text-3xl text-slate-900 dark:text-white">All Flights</h1>
          <p class="text-slate-500 mt-1">Showing {{ filtered().length }} available flights</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Filters -->
        <div class="card p-5 mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">

            <!-- Search -->
            <div>
              <label class="label">Search</label>
              <div class="relative">
                <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  [ngModel]="search()"
                  (ngModelChange)="search.set($event)"
                  placeholder="City or flight code..."
                  class="input pl-9" />
              </div>
            </div>

            <!-- From -->
            <div>
              <label class="label">From</label>
              <select [ngModel]="filterSource()" (ngModelChange)="filterSource.set($event)" class="input">
                <option value="">All Cities</option>
                @for (c of cities; track c) { <option>{{ c }}</option> }
              </select>
            </div>

            <!-- To -->
            <div>
              <label class="label">To</label>
              <select [ngModel]="filterDest()" (ngModelChange)="filterDest.set($event)" class="input">
                <option value="">All Cities</option>
                @for (c of cities; track c) { <option>{{ c }}</option> }
              </select>
            </div>

            <!-- Price Range -->
            <div>
              <label class="label">Price Range</label>
              <select [ngModel]="priceLabel()" (ngModelChange)="setPriceFilter($event)" class="input">
                <option value="any">Any Price</option>
                <option value="3000">Under Rs.3,000</option>
                <option value="5000">Under Rs.5,000</option>
                <option value="10000">Under Rs.10,000</option>
                <option value="20000">Under Rs.20,000</option>
                <option value="above20000">More than Rs.20,000</option>
              </select>
            </div>

            <!-- Sort By -->
            <div>
              <label class="label">Sort By</label>
              <select [ngModel]="sortBy()" (ngModelChange)="sortBy.set($event)" class="input">
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="time-asc">Departure: Earliest</option>
                <option value="time-desc">Departure: Latest</option>
              </select>
            </div>

          </div>
          <div class="flex justify-end mt-4">
            <button (click)="clearFilters()" class="btn-ghost text-xs">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          </div>
        </div>

        <!-- Results -->
        @if (loading()) {
          <app-loader message="Searching flights..." />
        } @else if (filtered().length === 0) {
          <app-empty-state
            title="No flights found"
            message="Try adjusting your filters or search terms."
            icon="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-stagger">
            @for (f of filtered(); track f.id) {
              <app-flight-card [flight]="f" (onBook)="selectedFlight.set($event)" />
            }
          </div>
        }
      </div>
    </div>

    @if (selectedFlight()) {
      <app-booking-modal [flight]="selectedFlight()!" (close)="selectedFlight.set(null)" />
    }
  `
})
export class FlightsComponent implements OnInit {
  allFlights = signal<Flight[]>([]);
  loading = signal(true);
  selectedFlight = signal<Flight | null>(null);

  search = signal('');
  filterSource = signal('');
  filterDest = signal('');
  maxPrice = signal<number | null>(null);
  priceMin = signal<number | null>(null);
  priceLabel = signal('any');
  sortBy = signal('price-asc');

  cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Dubai', 'London'];

  filtered = computed(() => {
    let list = [...this.allFlights()];

    // Search
    const q = this.search().toLowerCase().trim();
    if (q) {
      list = list.filter(f => {
        const source = f.source?.toLowerCase() || '';
        const dest = f.destination?.toLowerCase() || '';
        const code = f.flightCode?.toLowerCase() || '';
        const number = f.flightNumber?.toLowerCase() || '';

        return source.includes(q) || dest.includes(q) || code.includes(q) || number.includes(q);
      });
    }

    // From filter
    if (this.filterSource()) {
      list = list.filter(f => f.source === this.filterSource());
    }

    // To filter
    if (this.filterDest()) {
      list = list.filter(f => f.destination === this.filterDest());
    }

    // Price filter
    if (this.priceMin() !== null) {
      list = list.filter(f => f.price > this.priceMin()!);
    }
    if (this.maxPrice() !== null) {
      list = list.filter(f => f.price <= this.maxPrice()!);
    }

    // Sort
    list.sort((a, b) => {
      if (this.sortBy() === 'price-asc') return a.price - b.price;
      if (this.sortBy() === 'price-desc') return b.price - a.price;
      if (this.sortBy() === 'time-asc') return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
      return new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
    });

    return list;
  });

  constructor(private flightService: FlightService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['source']) this.filterSource.set(params['source']);
      if (params['destination']) this.filterDest.set(params['destination']);
    });
    this.flightService.getAllFlights().subscribe({
      next: (flights) => { this.allFlights.set(flights); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  setPriceFilter(value: string): void {
    this.priceLabel.set(value);
    if (value === 'above20000') {
      this.maxPrice.set(null);
      this.priceMin.set(20000);
    } else if (value === 'any') {
      this.maxPrice.set(null);
      this.priceMin.set(null);
    } else {
      this.maxPrice.set(+value);
      this.priceMin.set(null);
    }
  }

  clearFilters(): void {
    this.search.set('');
    this.filterSource.set('');
    this.filterDest.set('');
    this.maxPrice.set(null);
    this.priceMin.set(null);
    this.priceLabel.set('any');
    this.sortBy.set('price-asc');
  }
}