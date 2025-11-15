import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'guides',
    loadComponent: () => import('./components/guides/guides.component').then(m => m.default)
  },
  {
    path: 'articles',
    loadComponent: () => import('./components/articles/articles.component').then(m => m.default)
  },
  {
    path: 'tutorials',
    loadComponent: () => import('./components/tutorials/tutorials.component').then(m => m.default)
  },
  {
    path: 'events',
    loadComponent: () => import('./components/events/events.component').then(m => m.default)
  }
];