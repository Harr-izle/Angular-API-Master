import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';
import { selectPostById } from '../../state/post.selectors';
import * as PostActions from '../../state/post.actions';
import { CommonModule } from '@angular/common';
import { AppState } from '../../state/post.state';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit {
  post$: Observable<Post | undefined>;
  postForm = this.fb.group({
    id: [0],
    title: ['', Validators.required],
    body: ['', Validators.required],
    userId: [0]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post$ = this.store.select(selectPostById(postId));
  }

  ngOnInit() {
    this.post$.subscribe(post => {
      if (post) {
        this.postForm.patchValue(post);
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const updatedPost = this.postForm.value as Post;
      this.store.dispatch(PostActions.updatePost({ post: updatedPost }));
      this.router.navigate(['/posts']);
    }
  }
}