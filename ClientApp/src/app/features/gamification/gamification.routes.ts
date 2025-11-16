import { Routes } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';

/**
 * Path constants for gamification routes to improve maintainability
 * and avoid magic strings.
 */
const GAMIFICATION_PATHS = {
  LEADERBOARD: 'leaderboard',
  BADGES: 'badges',
  POINTS: 'points',
  ACHIEVEMENTS: 'achievements'
} as const;

/**
 * Routes configuration for the gamification feature module.
 * Implements lazy loading for performance optimization and includes
 * authentication guards for secure access.
 */
export const GAMIFICATION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: GAMIFICATION_PATHS.LEADERBOARD,
    pathMatch: 'full'
  },
  {
    path: GAMIFICATION_PATHS.LEADERBOARD,
    loadComponent: () => import('./components/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
    canActivate: [AuthGuard],
    data: { title: 'Leaderboard' }
  },
  {
    path: GAMIFICATION_PATHS.BADGES,
    loadComponent: () => import('./components/badges/badges.component').then(m => m.BadgesComponent),
    canActivate: [AuthGuard],
    data: { title: 'Badges' }
  },
  {
    path: GAMIFICATION_PATHS.POINTS,
    loadComponent: () => import('./components/points/points.component').then(m => m.PointsComponent),
    canActivate: [AuthGuard],
    data: { title: 'Points' }
  },
  {
    path: GAMIFICATION_PATHS.ACHIEVEMENTS,
    loadComponent: () => import('./components/achievements/achievements.component').then(m => m.AchievementsComponent),
    canActivate: [AuthGuard],
    data: { title: 'Achievements' }
  },
  // Wildcard route for handling unknown paths - redirects to leaderboard
  {
    path: '**',
    redirectTo: GAMIFICATION_PATHS.LEADERBOARD
  }
];