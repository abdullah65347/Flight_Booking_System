import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'flights',
    loadComponent: () => import('./pages/flights/flights.component').then(m => m.FlightsComponent)
  },
  {
    path: 'my-bookings',
    loadComponent: () => import('./pages/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'flights',
        loadComponent: () => import('./pages/admin/manage-flights/manage-flights.component').then(m => m.ManageFlightsComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/manage-users/manage-users.component').then(m => m.ManageUsersComponent)
      },
      {
        path: 'bookings',
        loadComponent: () => import('./pages/admin/manage-bookings/manage-bookings.component').then(m => m.ManageBookingsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
