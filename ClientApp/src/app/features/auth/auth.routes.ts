import { Routes } from '@angular/router';
import { GuestGuard } from '../../../core/guards/guest.guard';

// Path constants for better maintainability and to avoid magic strings
const AUTH_PATHS = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
  REGISTER_EXPERT: 'register-expert',
  REGISTER_GARAGE: 'register-garage',
  REGISTER_VENDOR: 'register-vendor'
} as const;

export const AUTH_ROUTES: Routes = [
  // Default redirect to login for unauthenticated users
  {
    path: '',
    redirectTo: AUTH_PATHS.LOGIN,
    pathMatch: 'full'
  },
  // Authentication routes - accessible only to guests (unauthenticated users)
  {
    path: AUTH_PATHS.LOGIN,
    loadComponent: () => import('./components/login/login.component').then(m => m.default).catch(err => {
      console.error('Error loading login component:', err);
      throw err; // Re-throw to let Angular handle the error
    }),
    canActivate: [GuestGuard],
    data: { title: 'Login' }
  },
  {
    path: AUTH_PATHS.REGISTER,
    loadComponent: () => import('./components/register/register.component').then(m => m.default).catch(err => {
      console.error('Error loading register component:', err);
      throw err;
    }),
    canActivate: [GuestGuard],
    data: { title: 'Register' }
  },
  // Password recovery routes
  {
    path: AUTH_PATHS.FORGOT_PASSWORD,
    loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.default).catch(err => {
      console.error('Error loading forgot-password component:', err);
      throw err;
    }),
    canActivate: [GuestGuard],
    data: { title: 'Forgot Password' }
  },
  {
    path: AUTH_PATHS.RESET_PASSWORD,
    loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.default).catch(err => {
      console.error('Error loading reset-password component:', err);
      throw err;
    }),
    canActivate: [GuestGuard],
    data: { title: 'Reset Password' }
  },
  // Specialized registration routes for different user types
  {
    path: AUTH_PATHS.REGISTER_EXPERT,
    loadComponent: () => import('./components/register-expert/register-expert.component').then(m => m.default).catch(err => {
      console.error('Error loading register-expert component:', err);
      throw err;
    }),
    canActivate: [GuestGuard],
    data: { title: 'Register as Expert' }
  },
  {
    path: AUTH_PATHS.REGISTER_GARAGE,
    loadComponent: () => import('./components/register-garage/register-garage.component').then(m => m.default).catch(err => {
      console.error('Error loading register-garage component:', err);
      throw err;
    }),
    canActivate: [GuestGuard],
    data: { title: 'Register Garage' }
  },
  {
    path: AUTH_PATHS.REGISTER_VENDOR,
    loadComponent: () => import('./components/register-vendor/register-vendor.component').then(m => m.default).catch(err => {
      console.error('Error loading register-vendor component:', err);
      throw err;
    }),
    canActivate: [GuestGuard],
    data: { title: 'Register as Vendor' }
  },
  // Wildcard route to handle any unmatched paths within auth module
  {
    path: '**',
    redirectTo: AUTH_PATHS.LOGIN
  }
];