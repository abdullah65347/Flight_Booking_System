# ✈️ AirBook — Flight Booking System (Angular 17 Frontend)

A modern, production-ready Angular 17+ frontend for a Flight Booking System. Built with TailwindCSS, Angular Signals, standalone components, lazy loading, and a clean design system.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| Angular 17+ | Framework (standalone components, signals, control flow) |
| TailwindCSS 3 | Utility-first styling with custom design tokens |
| Angular Router | Lazy-loaded routes, route guards |
| Angular Reactive Forms | Form handling with validation |
| Angular Signals | Reactive state management |
| HttpClient + Interceptors | API calls with JWT injection |

---

## 📁 Project Structure

```
src/app/
├── components/
│   ├── navbar/           # Sticky responsive navbar with theme toggle
│   ├── footer/           # Footer with social links
│   ├── flight-card/      # Reusable flight card with booking
│   ├── booking-modal/    # Book flight modal with confirmation
│   ├── confirmation-modal/ # Reusable confirm/delete dialog
│   └── toast/            # Toast notification system
├── pages/
│   ├── home/             # Landing page with hero, destinations, CTA
│   ├── flights/          # All flights with filter/sort
│   ├── my-bookings/      # User's booking history
│   ├── login/            # Login form with validation
│   ├── register/         # Register with password strength
│   └── admin/
│       ├── admin-layout  # Sidebar layout component
│       ├── admin-dashboard/  # Stats overview
│       ├── manage-flights/   # CRUD flights table
│       ├── manage-users/     # View/delete users
│       └── manage-bookings/  # View all bookings
├── services/
│   ├── auth.service.ts       # JWT auth, login, register, logout
│   ├── flight.service.ts     # Flight API calls
│   ├── booking.service.ts    # Booking API calls
│   ├── user.service.ts       # User management API
│   ├── toast.service.ts      # Toast notification signals
│   ├── theme.service.ts      # Dark/light mode with localStorage
│   ├── auth.guard.ts         # Auth/Admin/Guest route guards
│   └── auth.interceptor.ts   # JWT Bearer token injection
├── models/
│   ├── flight.model.ts
│   ├── booking.model.ts
│   └── user.model.ts
└── shared/
    ├── loader/           # Loading spinner
    └── empty-state/      # Empty page state UI
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- Angular CLI 17+

```bash
npm install -g @angular/cli@17
```

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
ng serve

# App runs at http://localhost:4200
```

> Make sure your Spring Boot backend is running at `http://localhost:8080`

---

## 🔐 Authentication Flow

1. User registers or logs in → backend returns JWT token
2. Token is stored in `localStorage`
3. `authInterceptor` automatically attaches `Authorization: Bearer <token>` to all protected requests
4. `authGuard` protects user routes, `adminGuard` protects admin routes
5. `guestGuard` redirects authenticated users away from login/register

---

## 🎨 Design System

### Color Palette
- **Primary**: Brand blue (`brand-500 = #00a2f0`)
- **Dark backgrounds**: `dark-900 (#0f172a)`, `dark-950 (#080f1f)`
- **Success**: Emerald, **Error**: Red, **Warning**: Amber

### Typography
- **Display font**: Sora (headings)
- **Body font**: DM Sans (body text)

### Custom CSS Classes (defined in `styles.scss`)
| Class | Usage |
|---|---|
| `.btn-primary` | Primary CTA button |
| `.btn-secondary` | Outlined secondary button |
| `.btn-danger` | Red destructive button |
| `.btn-ghost` | Transparent hover button |
| `.card` | White/dark rounded card |
| `.input` | Form input styling |
| `.label` | Form label |
| `.badge-blue/green/red/yellow` | Status badges |
| `.glass` | Frosted glass effect |

### Animations
All defined in `tailwind.config.js`:
- `animate-fade-in`, `animate-fade-up`
- `animate-scale-in` (modals)
- `animate-slide-down` (mobile menu)
- `animate-stagger` (staggered list reveals)
- `page-enter` (route transitions)

---

## 📱 Pages Overview

### Public Pages
| Route | Component | Description |
|---|---|---|
| `/` | HomeComponent | Hero, destinations, flights, features, CTA |
| `/flights` | FlightsComponent | All flights with filters, search, sort |
| `/login` | LoginComponent | Email/password login |
| `/register` | RegisterComponent | Name/email/password registration |

### Authenticated User Pages
| Route | Guard | Description |
|---|---|---|
| `/my-bookings` | authGuard | User's booking list with cancel option |

### Admin Pages
| Route | Guard | Description |
|---|---|---|
| `/admin` | adminGuard | Dashboard with stats |
| `/admin/flights` | adminGuard | CRUD table for flights |
| `/admin/users` | adminGuard | View and delete users |
| `/admin/bookings` | adminGuard | View all bookings |

---

## 🔌 API Integration

Base URL: `http://localhost:8080`

All API calls match the provided documentation:

| Service | Method | Endpoint |
|---|---|---|
| Auth | POST | `/api/auth/login`, `/api/auth/register` |
| Flights | GET/POST/PUT/DELETE | `/api/flights`, `/api/flights/search` |
| Bookings | GET/POST/DELETE | `/api/bookings`, `/api/bookings/all` |
| Users | GET/DELETE | `/api/users`, `/api/users/{id}` |

---

## 🌗 Dark Mode

Toggle via the moon/sun icon in the navbar. Preference is saved to `localStorage`. Uses Tailwind's `darkMode: 'class'` strategy.

---

## 📦 Build for Production

```bash
ng build --configuration production
```

Output is in `dist/flight-booking-app/`.

---

## 🧪 Test Credentials (based on your API)

```
Admin:  admin@gmail.com / password
User:   user@gmail.com / password
```

---

## 🛠️ Customization

- **Change API URL**: Update `baseUrl` in each service file
- **Add cities**: Update the `cities` array in `flights.component.ts`
- **Change theme colors**: Modify `brand` palette in `tailwind.config.js`
