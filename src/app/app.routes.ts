import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadComponent: () => import('./components/post-list/post-list.component').then(m => m.PostListComponent)
  },
  {
    path: 'post/:id',
    loadComponent: () => import('./components/post/post.component').then(m => m.PostComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/create-new-post/create-new-post.component').then(m => m.CreateNewPostComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/edit-post/edit-post.component').then(m => m.EditPostComponent)
  },
  { path: '**', redirectTo: '/posts' }
];