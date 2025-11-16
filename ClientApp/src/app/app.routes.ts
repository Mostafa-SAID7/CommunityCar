
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'community',
    loadChildren: () => import('./features/community/community.routes').then(m => m.COMMUNITY_ROUTES)
  },
  {
    path: 'services',
    loadChildren: () => import('./features/services/services.routes').then(m => m.SERVICES_ROUTES)
  },
  {
    path: 'content',
    loadChildren: () => import('./features/content/content.routes').then(m => m.CONTENT_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'gamification',
    loadChildren: () => import('./features/gamification/gamification.routes').then(m => m.GAMIFICATION_ROUTES)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
