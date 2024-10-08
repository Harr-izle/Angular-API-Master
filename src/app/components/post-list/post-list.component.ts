import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';
import * as PostActions from '../../state/post.actions';
import {
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
} from '../../state/post.selectors';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { AppState } from '../../state/post.state';
import { NotificationService } from '../../services/notification.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  posts(posts: any) {
    throw new Error('Method not implemented.');
  }
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  currentPage: number = 1;
  totalPages: number = 10;
  postsPerPage: number = 10;

  constructor(
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {
    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostsLoading);
    this.error$ = this.store.select(selectPostsError);
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.store.dispatch(
      PostActions.loadPosts({
        page: this.currentPage,
        limit: this.postsPerPage,
      })
    );
  }

  openDeleteModal(id: number) {
    this.modalService.openModal(id);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }
}
