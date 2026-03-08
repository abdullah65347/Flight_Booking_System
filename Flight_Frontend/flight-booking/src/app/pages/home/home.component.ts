import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { BookingModalComponent } from 'src/app/components/booking-modal/booking-modal.component';
import { FlightCardComponent } from 'src/app/components/flight-card/flight-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, FlightCardComponent, BookingModalComponent],
  template: `
   <!-- Hero -->
<section class="relative min-h-[88vh] flex items-center overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 dark:from-dark-950 dark:via-brand-950 dark:to-dark-950">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 25% 50%, rgba(14,165,233,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 20%, rgba(56,189,248,0.3) 0%, transparent 40%)"></div>
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-dark-900 to-transparent"></div>
    <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
  </div>

      <!-- Airplane image — outside the background div, inside section -->
          <img
      src="assets/airplane-png.png"
      alt="airplane"
      class="absolute w-72 animate-fly pointer-events-none hidden lg:block"
      style="opacity:0.35; filter:brightness(0) invert(1);"
    />
      <img
      src="assets/airplane-png.png"
      alt="airplane"
      class="absolute right-8 bottom-8 w-2/5 h-auto hidden lg:block object-contain animate-float"
    />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div class="max-w-2xl mb-10 animate-fade-up">
          <span class="badge-blue inline-flex mb-4">Best Flight Deals 2026</span>
          <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            Book Flights<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-sky-300">Easily.</span>
          </h1>
          <p class="text-lg text-brand-100/80 mt-4 leading-relaxed max-w-xl">
            Discover and book the best flights at unbeatable prices. Seamless booking, real-time updates, and 24/7 support.
          </p>
        </div>

        <!-- Search Form -->
        <div class="card max-w-2xl p-5 animate-fade-up bg-white/95 dark:bg-dark-800/95 backdrop-blur-md" style="animation-delay:0.2s">
          <h3 class="font-display font-semibold text-slate-800 dark:text-white mb-4">Search Flights</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="label">From</label>
              <select [(ngModel)]="searchSource" class="input">
                <option value="">Any City</option>
                @for (city of cities; track city) { <option>{{ city }}</option> }
              </select>
            </div>
            <div>
              <label class="label">To</label>
              <select [(ngModel)]="searchDest" class="input">
                <option value="">Any City</option>
                @for (city of cities; track city) { <option>{{ city }}</option> }
              </select>
            </div>
            <div class="flex items-end">
              <button (click)="searchFlights()" class="btn-primary w-full py-2.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="py-16 bg-white dark:bg-dark-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 animate-fade-up">
          <h2 class="section-title">Popular Destinations</h2>
          <p class="section-subtitle">Explore the most loved destinations worldwide</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger">
          @for (dest of destinations; track dest.city) {
            <div
  class="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square
         transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl
         active:scale-95"
  (click)="searchDest = dest.city; searchFlights()"
>

  <!-- Background -->
  <div
    [style.background]="dest.gradient"
    class="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
  </div>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

  <!-- Glow -->
  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10"></div>

  <!-- Content -->
  <div class="absolute inset-0 flex flex-col justify-end p-4">

    <div class="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
      {{ dest.emoji }}
    </div>

    <p class="text-white font-display font-bold text-base tracking-wide">
      {{ dest.city }}
    </p>

    <div class="flex items-center justify-between mt-1">

      <p class="text-white/80 text-xs">
        from ₹{{ dest.from | number }}
      </p>

      <!-- Arrow -->
      <svg
        class="w-4 h-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 5l7 7-7 7" />
      </svg>

    </div>

  </div>
</div>
          }
        </div>
      </div>
    </section>

    <!-- Featured Flights -->
    <section class="py-16 bg-slate-50 dark:bg-dark-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-10">
          <div class="animate-fade-up">
            <h2 class="section-title">Featured Flights</h2>
            <p class="section-subtitle">Best deals available right now</p>
          </div>
          <a routerLink="/flights" class="btn-secondary hidden sm:flex">View All →</a>
        </div>

        @if (featuredFlights().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-stagger">
            @for (f of featuredFlights(); track f.id) {
              <app-flight-card [flight]="f" (onBook)="openBooking($event)" />
            }
          </div>
        } @else {
          <p class="text-center text-slate-400 py-12">Loading flights...</p>
        }
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-16 bg-white dark:bg-dark-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 animate-fade-up">
          <h2 class="section-title">Why Choose AirBook?</h2>
          <p class="section-subtitle">We make flying simple, safe, and affordable</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger">
          @for (f of features; track f.title) {
            <div class="card p-6 text-center hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 bg-brand-50 dark:bg-brand-950 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">{{ f.icon }}</div>
              <h3 class="font-display font-bold text-slate-900 dark:text-white mb-2">{{ f.title }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ f.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-slate-50 dark:bg-dark-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 animate-fade-up">
          <h2 class="section-title">What Our Customers Say</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 animate-stagger">
          @for (t of testimonials; track t.name) {
            <div class="card p-6">
              <div class="flex items-center gap-1 mb-3">
                @for (s of [1,2,3,4,5]; track s) {
                  <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                }
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 italic mb-4">"{{ t.text }}"</p>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">{{ t.name.charAt(0) }}</div>
                <div>
                  <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ t.name }}</p>
                  <p class="text-xs text-slate-400">{{ t.city }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-900 dark:to-dark-950">
      <div class="max-w-2xl mx-auto px-4 text-center animate-fade-up">
        <h2 class="font-display text-4xl font-extrabold text-white mb-4">Ready to Fly?</h2>
        <p class="text-brand-100 mb-8 text-lg">Search thousands of flights and book your next adventure today.</p>
        <a routerLink="/flights" class="inline-flex items-center gap-2 bg-white text-brand-600 font-display font-bold px-8 py-3.5 rounded-2xl hover:bg-brand-50 transition-all shadow-glow hover:shadow-glow-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Search Flights
        </a>
      </div>
    </section>

    <!-- Booking Modal -->
    @if (selectedFlight()) {
      <app-booking-modal [flight]="selectedFlight()!" (close)="selectedFlight.set(null)" />
    }
  `
})
export class HomeComponent implements OnInit {
  featuredFlights = signal<Flight[]>([]);
  selectedFlight = signal<Flight | null>(null);
  searchSource = '';
  searchDest = '';

  cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Dubai', 'London'];

  destinations = [
    { city: 'Delhi', emoji: '🏛️', from: 2999, gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
    { city: 'Mumbai', emoji: '🌊', from: 3499, gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
    { city: 'Bangalore', emoji: '🌿', from: 2799, gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
    { city: 'Hyderabad', emoji: '💎', from: 3199, gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
    { city: 'Dubai', emoji: '🌆', from: 12999, gradient: 'linear-gradient(135deg,#fa709a,#fee140)' },
    { city: 'London', emoji: '🎡', from: 39999, gradient: 'linear-gradient(135deg,#30cfd0,#330867)' },
  ];

  features = [
    { icon: '🔒', title: 'Secure Booking', desc: 'End-to-end encrypted transactions. Your personal and payment data is always safe.' },
    { icon: '💰', title: 'Best Prices', desc: 'We guarantee the lowest fares. If you find cheaper, we\'ll match it.' },
    { icon: '🎧', title: '24/7 Support', desc: 'Round the clock customer support via chat, email, and phone.' },
  ];

  testimonials = [
    { name: 'Priya Sharma', city: 'Mumbai', text: 'Booked my first international flight through AirBook. Super smooth experience and great prices!' },
    { name: 'Rahul Verma', city: 'Delhi', text: 'The interface is clean and intuitive. Found the best deal in minutes. Highly recommend!' },
    { name: 'Anjali Singh', city: 'Bangalore', text: 'Customer support helped me reschedule my flight instantly. Couldn\'t ask for better service.' },
  ];

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => this.featuredFlights.set(flights.slice(0, 6)),
      error: () => { }
    });
  }

  searchFlights(): void {
    this.router.navigate(['/flights'], {
      queryParams: { source: this.searchSource, destination: this.searchDest }
    });
  }

  openBooking(flight: Flight): void {
    this.selectedFlight.set(flight);
  }
}
