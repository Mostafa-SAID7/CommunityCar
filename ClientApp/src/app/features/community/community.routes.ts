import { Routes } from '@angular/router';

// Community feature routes with improved logic and structure
export const COMMUNITY_ROUTES: Routes = [
  // Default redirect to posts list
  { path: '', redirectTo: 'posts', pathMatch: 'full' },

  // Posts CRUD and details
  {
    path: 'posts',
    children: [
      { path: '', loadComponent: () => import('./components/posts/post-list/post-list.component').then(m => m.PostListComponent) },
      { path: 'create', loadComponent: () => import('./components/posts/create-post/create-post.component').then(m => m.CreatePostComponent) },
      { path: ':id', loadComponent: () => import('./components/posts/post-details/post-details.component').then(m => m.PostDetailsComponent) },
      { path: ':id/edit', loadComponent: () => import('./components/posts/edit-post/edit-post.component').then(m => m.EditPostComponent) }
    ]
  },

  // Answers CRUD and details
  {
    path: 'answers',
    children: [
      { path: '', loadComponent: () => import('./components/answers/answer-list/answer-list.component').then(m => m.AnswerListComponent) },
      { path: 'add', loadComponent: () => import('./components/answers/add-answer/add-answer.component').then(m => m.AddAnswerComponent) },
      { path: ':id', loadComponent: () => import('./components/answers/answer-card/answer-card.component').then(m => m.AnswerCardComponent) }
    ]
  },

  // Groups CRUD and details
  {
    path: 'groups',
    children: [
      { path: '', loadComponent: () => import('./components/groups/group-list/group-list.component').then(m => m.GroupListComponent) },
      { path: ':id', loadComponent: () => import('./components/groups/group-details/group-details.component').then(m => m.GroupDetailsComponent) },
      { path: ':id/card', loadComponent: () => import('./components/groups/group-card/group-card.component').then(m => m.GroupCardComponent) }
    ]
  },

  // Tag cloud
  {
    path: 'tags',
    loadComponent: () => import('./components/tags/tag-cloud/tag-cloud.component').then(m => m.TagCloudComponent)
  },

  // Voting features
  {
    path: 'voting',
    children: [
      { path: 'vote', loadComponent: () => import('./components/voting/vote-buttons/vote-buttons.component').then(m => m.VoteButtonsComponent) },
      { path: 'share', loadComponent: () => import('./components/voting/share-buttons/share-buttons.component').then(m => m.ShareButtonsComponent) }
    ]
  },



  // Wildcard route for not found
  {
    path: '**',
    redirectTo: 'posts'
  }
];