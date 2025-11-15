import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: 'user-profile',
    loadComponent: () => import('./components/user-profile/user-profile.component').then(m => m.default)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./components/edit-profile/edit-profile.component').then(m => m.default)
  },
  {
    path: 'vehicle-management',
    loadComponent: () => import('./components/vehicle-management/vehicle-management.component').then(m => m.default)
  },
  {
    path: 'achievements',
    loadComponent: () => import('./components/achievements/achievements.component').then(m => m.default)
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/settings/settings.component').then(m => m.default)
  }
];