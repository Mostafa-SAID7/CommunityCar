import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [
  {
    path: 'garages',
    loadComponent: () => import('./components/garages/garages.component.js').then(m => m.GaragesComponent)
  },
  {
    path: 'experts',
    loadComponent: () => import('./components/experts/experts.component.js').then(m => m.ExpertsComponent)
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./components/marketplace/marketplace.component.js').then(m => m.MarketplaceComponent)
  },
  {
    path: 'bookings',
    loadComponent: () => import('./components/bookings/bookings.component.js').then(m => m.BookingsComponent)
  }
];