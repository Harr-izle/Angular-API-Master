import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CreateNewPostComponent } from './components/create-new-post/create-new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PostComponent,
    PostListComponent,
    CreateNewPostComponent,
    EditPostComponent,
    NotificationComponent,
    DeleteModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular-API-Master';
  constructor(private apiService: ApiService) {}
}
