
import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';
import { selectPostById } from '../../state/post.selectors';
import * as PostActions from '../../state/post.actions';  // Import actions correctly
import { CommonModule } from '@angular/common';
import { AppState } from '../../state/post.state';  // Ensure correct AppState import

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
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
    private store: Store<AppState>  // Make sure to specify Store<AppState>
  ) {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.post$ = this.store.select(selectPostById(postId));  // Correct selector usage
  }

  ngOnInit() {
    this.post$.subscribe(post => {
      if (post) {
        this.postForm.patchValue(post);  // Patch the form with the post data
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.store.dispatch(PostActions.updatePost({ post: this.postForm.value as Post }));  // Dispatch update action
    }
  }
}

