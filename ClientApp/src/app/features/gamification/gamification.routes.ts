
import { Routes } from '@angular/router';

const GAMIFICATION_PATHS = {
  LEADERBOARD: 'leaderboard',
  BADGES: 'badges',
  POINTS: 'points',
  ACHIEVEMENTS: 'achievements'
} as const;

export const GAMIFICATION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: GAMIFICATION_PATHS.LEADERBOARD,
    pathMatch: 'full'
  },
  {
    path: GAMIFICATION_PATHS.LEADERBOARD,
    loadComponent: () => import('./components/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
    data: { title: 'Leaderboard' }
  },
  {
    path: GAMIFICATION_PATHS.BADGES,
    loadComponent: () => import('./components/badges/badges.component').then(m => m.BadgesComponent),
    data: { title: 'Badges' }
  },
  {
    path: GAMIFICATION_PATHS.POINTS,
    loadComponent: () => import('./components/points/points.component').then(m => m.PointsComponent),
    data: { title: 'Points' }
  },
  {
    path: GAMIFICATION_PATHS.ACHIEVEMENTS,
    loadComponent: () => import('./components/achievements/achievements.component').then(m => m.AchievementsComponent),
    data: { title: 'Achievements' }
  },
  {
    path: '**',
    redirectTo: GAMIFICATION_PATHS.LEADERBOARD
  }
];