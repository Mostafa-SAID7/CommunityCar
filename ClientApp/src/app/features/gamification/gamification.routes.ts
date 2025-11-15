import { Routes } from '@angular/router';

export const GAMIFICATION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'leaderboard',
    pathMatch: 'full'
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./components/leaderboard/leaderboard.component').then(m => m.default)
  },
  {
    path: 'badges',
    loadComponent: () => import('./components/badges/badges.component').then(m => m.default)
  },
  {
    path: 'points',
    loadComponent: () => import('./components/points/points.component').then(m => m.default)
  },
  {
    path: 'achievements',
    loadComponent: () => import('./components/achievements/achievements.component').then(m => m.default)
  }
];