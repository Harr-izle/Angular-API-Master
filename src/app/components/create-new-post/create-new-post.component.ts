import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from '../../interfaces/post';
import { AppState } from '../../state/post.state';
import * as PostActions from '../../state/post.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.scss'
})
export class CreateNewPostComponent {
  postForm = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    userId: [1] // Assuming a fixed userId for simplicity
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router,) {}

  onSubmit() {
    if (this.postForm.valid) {
      this.store.dispatch(PostActions.createPost({ post: this.postForm.value as Omit<Post, 'id'> }));
      this.router.navigate(['/posts']);
    }
  }
}
