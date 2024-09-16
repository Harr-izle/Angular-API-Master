import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalService } from '../../service/modal.service';
import { NotificationService } from '../../service/notification.service';
import { AppState } from '../../state/post.state';
import * as PostActions from '../../state/post.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  isOpen$ = this.modalService.isOpen$;
  postIdSubscription: Subscription | undefined;
  currentPostId: number | null = null;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Close modal when clicking outside
    window.addEventListener('click', this.onWindowClick);

    // Subscribe to postId changes
    this.postIdSubscription = this.modalService.postId$.subscribe(id => {
      this.currentPostId = id;
    });
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.onWindowClick);
    if (this.postIdSubscription) {
      this.postIdSubscription.unsubscribe();
    }
  }

  onWindowClick = (e: MouseEvent) => {
    if (e.target === document.querySelector('.del-modal')) {
      this.onCancel();
    }
  }

  onCancel() {
    this.modalService.closeModal();
  }

  onConfirmDelete() {
    if (this.currentPostId !== null) {
      this.store.dispatch(PostActions.deletePost({ id: this.currentPostId }));
      this.notificationService.show('Post deleted successfully');
      this.modalService.closeModal();
    }
  }

}
