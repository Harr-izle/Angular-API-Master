import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../services/notification.service';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;
  let notificationsSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    notificationsSubject = new BehaviorSubject<string | null>(null);

    await TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: {
            notifications$: notificationsSubject.asObservable()
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notification message', () => {
    const testMessage = 'Test Notification';
    notificationsSubject.next(testMessage);
    fixture.detectChanges();
    
    const notificationElement = fixture.debugElement.query(By.css('.notification'));
    expect(notificationElement).toBeTruthy();
    expect(notificationElement.nativeElement.textContent).toContain(testMessage);
  });

  it('should hide notification after timeout', (done) => {
    const testMessage = 'Timeout Notification';
    notificationsSubject.next(testMessage);
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const notificationElement = fixture.debugElement.query(By.css('.notification'));
      expect(notificationElement).toBeNull();
      done();
    }, 3500); 
  });
});
