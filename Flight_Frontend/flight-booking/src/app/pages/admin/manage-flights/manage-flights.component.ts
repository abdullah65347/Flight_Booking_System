import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FlightService } from '../../../services/flight.service';
import { ToastService } from '../../../services/toast.service';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state.component';
import { Flight } from '../../../models/flight.model';

function sourceDestDifferent(control: AbstractControl): ValidationErrors | null {
  const source = control.get('source')?.value;
  const destination = control.get('destination')?.value;
  if (source && destination && source === destination) {
    return { sameCities: true };
  }
  return null;
}

@Component({
  selector: 'app-manage-flights',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmationModalComponent, LoaderComponent, EmptyStateComponent],
  templateUrl: './manage-flights.component.html'
})
export class ManageFlightsComponent implements OnInit {
  flights = signal<Flight[]>([]);
  loading = signal(true);
  saving = signal(false);
  showModal = signal(false);
  editingFlight = signal<Flight | null>(null);
  deleteTarget = signal<Flight | null>(null);

  cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Dubai', 'London', 'New York', 'Singapore', 'Bangkok'];

  form = this.fb.group({
    flightNumber: ['', Validators.required],
    source: ['', Validators.required],
    destination: ['', Validators.required],
    departureTime: ['', Validators.required],
    arrivalTime: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    availableSeats: [0, [Validators.required, Validators.min(1)]],
  }, { validators: sourceDestDifferent });

  constructor(private flightService: FlightService, private toast: ToastService, private fb: FormBuilder) { }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.flightService.getAllFlights().subscribe({
      next: f => { this.flights.set(f); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  openModal(flight?: Flight): void {
    this.editingFlight.set(flight || null);
    if (flight) {
      this.form.patchValue({
        ...flight,
        departureTime: flight.departureTime.slice(0, 16),
        arrivalTime: flight.arrivalTime.slice(0, 16),
      });
    } else {
      this.form.reset();
    }
    this.showModal.set(true);
  }

  closeModal(): void { this.showModal.set(false); this.editingFlight.set(null); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.form.errors?.['sameCities']) {
      this.toast.error('Source and destination cannot be the same city.');
      return;
    }
    this.saving.set(true);
    const data = this.form.value as any;
    const req = this.editingFlight()
      ? this.flightService.updateFlight(this.editingFlight()!.id, data)
      : this.flightService.addFlight(data);

    req.subscribe({
      next: () => {
        this.saving.set(false);
        const wasEditing = this.editingFlight();
        this.closeModal();
        this.toast.success(wasEditing ? 'Flight updated!' : 'Flight added!');
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error('Failed to save flight', err?.error?.message);
      }
    });
  }

  deleteFlight(): void {
    const f = this.deleteTarget();
    if (!f) return;
    this.flightService.deleteFlight(f.id).subscribe({
      next: () => {
        this.toast.success('Flight deleted');
        this.deleteTarget.set(null);
        this.load();
      },
      error: () => { this.toast.error('Failed to delete'); this.deleteTarget.set(null); }
    });
  }

  formatDateTime(dt: string): string {
    return new Date(dt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
}