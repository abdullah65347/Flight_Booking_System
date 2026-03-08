import { Component, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-dark-950 flex items-center justify-center p-4">
      <div class="w-full max-w-md animate-fade-up">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-glow-sm">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h1 class="font-display font-bold text-2xl text-slate-900 dark:text-white">Create Account</h1>
            <p class="text-slate-500 text-sm mt-1">Join AirBook and start booking flights</p>
          </div>

          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="space-y-4">
              <div>
                <label class="label">Full Name</label>
                <input formControlName="name" type="text" placeholder="John Mario" class="input"
                       [class.ring-2]="f['name'].invalid && f['name'].touched"
                       [class.ring-red-400]="f['name'].invalid && f['name'].touched" />
                @if (f['name'].invalid && f['name'].touched) {
                  <p class="text-xs text-red-500 mt-1">Name is required</p>
                }
              </div>

              <div>
                <label class="label">Email Address</label>
                <input formControlName="email" type="email" placeholder="you@example.com" class="input"
                       [class.ring-2]="f['email'].invalid && f['email'].touched"
                       [class.ring-red-400]="f['email'].invalid && f['email'].touched" />
                @if (f['email'].errors?.['required'] && f['email'].touched) {
                  <p class="text-xs text-red-500 mt-1">Email is required</p>
                }
                @if (f['email'].errors?.['email'] && f['email'].touched) {
                  <p class="text-xs text-red-500 mt-1">Please enter a valid email</p>
                }
              </div>

              <div>
                <label class="label">Password</label>
                <div class="relative">
                  <input formControlName="password" [type]="showPwd() ? 'text' : 'password'" placeholder="Min. 6 characters" class="input pr-10"
                         [class.ring-2]="f['password'].invalid && f['password'].touched"
                         [class.ring-red-400]="f['password'].invalid && f['password'].touched" />
                  <button type="button" (click)="showPwd.set(!showPwd())" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                @if (f['password'].errors?.['required'] && f['password'].touched) {
                  <p class="text-xs text-red-500 mt-1">Password is required</p>
                }
                @if (f['password'].errors?.['minlength'] && f['password'].touched) {
                  <p class="text-xs text-red-500 mt-1">Password must be at least 6 characters</p>
                }
                @if ((f['password'].value?.length ?? 0) > 0) {
                  <div class="flex gap-1 mt-2">
                    @for (i of [1,2,3]; track i) {
                      <div class="h-1 flex-1 rounded-full" [class]="getStrengthClass(i)"></div>
                    }
                  </div>
                }
              </div>
            </div>

            @if (error()) {
              <div class="mt-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                {{ error() }}
              </div>
            }

            <button type="submit" [disabled]="loading()" class="btn-primary w-full mt-6 py-3">
              @if (loading()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                Creating account...
              } @else {
                Create Account
              }
            </button>
          </form>

          <p class="text-center text-sm text-slate-500 mt-6">
            Already have an account?
            <a routerLink="/login" class="text-brand-500 hover:text-brand-600 font-semibold ml-1">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = signal(false);
  error = signal('');
  showPwd = signal(false);

  get f() { return this.form.controls; }

  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastService, private router: Router) { }

  getStrengthClass(level: number): string {
    const pwd = this.f['password'].value || '';
    const strength = pwd.length >= 10 ? 3 : pwd.length >= 6 ? 2 : 1;
    if (level > strength) return 'bg-slate-200 dark:bg-slate-700';
    return strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-amber-400' : 'bg-emerald-400';
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    this.auth.register(this.form.value as any).subscribe({
      next: () => {
        this.toast.success('Account created successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Registration failed. Please try again.');
      }
    });
  }
}
