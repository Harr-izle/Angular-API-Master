import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';
import { selectPostById, selectCommentsByPostId } from '../../state/post.selectors';
import * as PostActions from '../../state/post.actions';  // Correct import
import { CommonModule } from '@angular/common';
import { AppState } from '../../state/post.state';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post$: Observable<Post | undefined>;
  comments$: Observable<Comment[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post$ = this.store.select(selectPostById(postId));
    this.comments$ = this.store.select(selectCommentsByPostId(postId));
  }

  ngOnInit() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(PostActions.loadComments({ postId }));  // Correct usage
  }
}
