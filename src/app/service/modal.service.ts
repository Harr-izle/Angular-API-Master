import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private postIdSubject = new BehaviorSubject<number | null>(null);

  isOpen$ = this.isOpenSubject.asObservable();
  postId$ = this.postIdSubject.asObservable();

  openModal(postId: number) {
    this.postIdSubject.next(postId);
    this.isOpenSubject.next(true);
  }

  closeModal() {
    this.isOpenSubject.next(false);
    this.postIdSubject.next(null);
  }
}