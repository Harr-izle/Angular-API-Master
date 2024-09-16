import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';
import * as PostActions from '../../state/post.actions';
import { selectAllPosts, selectPostsLoading, selectPostsError } from '../../state/post.selectors';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { AppState } from '../../state/post.state';
import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  currentPage: number = 1;
  totalPages: number = 10; // This should be calculated based on total number of posts
  postsPerPage: number = 10;

 
constructor(private store: Store<AppState>,private notificationService: NotificationService) {
  this.posts$ = this.store.select(selectAllPosts);
  this.loading$ = this.store.select(selectPostsLoading);
  this.error$ = this.store.select(selectPostsError);
  
}

ngOnInit() {
  console.log('PostListComponent: Dispatching loadPosts action');
  this.store.dispatch(PostActions.loadPosts({ page: 1, limit: 10 }));
}
loadPosts() {
  this.store.dispatch(PostActions.loadPosts({ page: this.currentPage, limit: this.postsPerPage }));
}

  deletePost(id: number) {
    this.store.dispatch(PostActions.deletePost({ id }));
    this.notificationService.show('Post deleted successfully');
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }
}
