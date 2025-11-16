import { Routes } from '@angular/router';

// Community feature routes with improved logic and structure
export const COMMUNITY_ROUTES: Routes = [
  // Default redirect to posts list
  { path: '', redirectTo: 'posts', pathMatch: 'full' },

  // Posts CRUD and details
  {
    path: 'posts',
    children: [
      { path: '', loadComponent: () => import('./components/posts/post-list/post-list.component') },
      { path: 'create', loadComponent: () => import('./components/posts/create-post/create-post.component') },
      { path: ':id', loadComponent: () => import('./components/posts/post-details/post-details.component') },
      { path: ':id/edit', loadComponent: () => import('./components/posts/edit-post/edit-post.component') }
    ]
  },

  // Answers CRUD and details
  {
    path: 'answers',
    children: [
      { path: '', loadComponent: () => import('./components/answers/answer-list/answer-list.component') },
      { path: 'add', loadComponent: () => import('./components/answers/add-answer/add-answer.component') },
      { path: ':id', loadComponent: () => import('./components/answers/answer-card/answer-card.component') }
    ]
  },

  // Groups CRUD and details
  {
    path: 'groups',
    children: [
      { path: '', loadComponent: () => import('./components/groups/group-list/group-list.component') },
      { path: ':id', loadComponent: () => import('./components/groups/group-details/group-details.component') },
      { path: ':id/card', loadComponent: () => import('./components/groups/group-card/group-card.component') }
    ]
  },

  // Tag cloud
  {
    path: 'tags',
    loadComponent: () => import('./components/tags/tag-cloud/tag-cloud.component')
  },

  // Voting features
  {
    path: 'voting',
    children: [
      { path: 'vote', loadComponent: () => import('./components/voting/vote-buttons/vote-buttons.component') },
      { path: 'share', loadComponent: () => import('./components/voting/share-buttons/share-buttons.component') }
    ]
  },



  // Wildcard route for not found
  {
    path: '**',
    redirectTo: 'posts'
  }
];