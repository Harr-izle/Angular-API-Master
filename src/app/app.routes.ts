import { Routes } from '@angular/router';
import { CreateNewPostComponent } from './components/create-new-post/create-new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'posts', component: PostListComponent },
    { path: 'post/:id', component: PostComponent },
    { path: 'create', component: CreateNewPostComponent },
    { path: 'edit/:id', component: EditPostComponent },
    { path: '**', redirectTo: '/posts' }
];
