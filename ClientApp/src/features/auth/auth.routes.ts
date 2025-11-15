import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('../../app/features/auth/components/login/login.component').then(m => m.default)
  },
  {
    path: 'register',
    loadComponent: () => import('../../app/features/auth/components/register/register.component').then(m => m.default)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('../../app/features/auth/components/forgot-password/forgot-password.component').then(m => m.default)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('../../app/features/auth/components/reset-password/reset-password.component').then(m => m.default)
  }
];