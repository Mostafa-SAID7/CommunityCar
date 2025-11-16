import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'guides',
    loadComponent: () => import('./components/guides/guides.component.js').then(m => m.GuidesComponent)
  },
  {
    path: 'articles',
    loadComponent: () => import('./components/articles/articles.component.js').then(m => m.ArticlesComponent)
  },
  {
    path: 'tutorials',
    loadComponent: () => import('./components/tutorials/tutorials.component.js').then(m => m.TutorialsComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./components/events/events.component.js').then(m => m.EventsComponent)
  }
];