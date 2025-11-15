import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [
  {
    path: 'garages',
    loadComponent: () => import('./components/garages/garages.component').then(m => m.default)
  },
  {
    path: 'experts',
    loadComponent: () => import('./components/experts/experts.component').then(m => m.default)
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./components/marketplace/marketplace.component').then(m => m.default)
  },
  {
    path: 'bookings',
    loadComponent: () => import('./components/bookings/bookings.component').then(m => m.default)
  }
];