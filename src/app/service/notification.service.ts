import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string | null>(null);
  notifications$ = this.notificationSubject.asObservable();

  show(message: string) {
    this.notificationSubject.next(message);
    setTimeout(() => this.notificationSubject.next(null), 3000); // Hide after 3 seconds
  }
}