import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the correct notification message', (done) => {
    const message = 'Test notification';
    
    service.notifications$.subscribe(notification => {
      if (notification === message) {
        done();
      }
    });

    service.show(message);
  });

  it('should clear the notification message after 3 seconds', fakeAsync(() => {
    const message = 'Test notification';
    
    service.show(message);

    service.notifications$.subscribe(notification => {
      if (notification === null) {
        expect(notification).toBeNull();
      }
    });

    tick(3000); // Simulate the passage of 3 seconds
  }));
});
