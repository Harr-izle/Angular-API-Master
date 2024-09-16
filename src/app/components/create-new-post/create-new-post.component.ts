import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from '../../interfaces/post';
import { AppState } from '../../state/post.state';
import * as PostActions from '../../state/post.actions';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-new-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.scss',
})
export class CreateNewPostComponent implements OnInit {
  postForm = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    userId: [1], // Assuming a fixed userId for simplicity
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((message) => {
      if (message) {
        // Handle the notification display logic here
        console.log('Notification:', message);
        // You can implement a custom UI for showing this notification
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.store.dispatch(
        PostActions.createPost({
          post: this.postForm.value as Omit<Post, 'id'>,
        })
      );
      this.notificationService.show('Post created successfully');
      this.router.navigate(['/posts']);
    }
  }
}
