import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CreateNewPostComponent } from './create-new-post.component';
import { NotificationService } from '../../services/notification.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as PostActions from '../../state/post.actions';
import { AppState } from '../../state/post.state';

describe('CreateNewPostComponent', () => {
  let component: CreateNewPostComponent;
  let fixture: ComponentFixture<CreateNewPostComponent>;
  let store: MockStore<AppState>;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateNewPostComponent],
      providers: [
        FormBuilder,
        provideMockStore(),
        { provide: NotificationService, useValue: { notifications$: of(null), show: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPostComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore) as MockStore<AppState>;
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.postForm).toBeTruthy();
    expect(component.postForm.controls['title'].value).toBe('');
    expect(component.postForm.controls['body'].value).toBe('');
    expect(component.postForm.controls['userId'].value).toBe(1);
  });

  it('should handle form submission', () => {
    // Arrange
    const formValue = { title: 'Test Title', body: 'Test Body', userId: 1 };
    component.postForm.setValue(formValue);

    // Act
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onSubmit();

    // Assert
    expect(dispatchSpy).toHaveBeenCalledWith(PostActions.createPost({ post: formValue }));
    expect(notificationService.show).toHaveBeenCalledWith('Post created successfully');
    expect(navigateSpy).toHaveBeenCalledWith(['/posts']);
  });

  it('should not submit the form if invalid', () => {
    // Arrange
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const navigateSpy = jest.spyOn(router, 'navigate');

    // Act
    component.onSubmit();

    // Assert
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should handle notifications', () => {
    // Arrange
    const spy = jest.spyOn(console, 'log');
    const message = 'Test notification';
    notificationService.notifications$ = of(message);

    // Act
    component.ngOnInit();

    // Assert
    expect(spy).toHaveBeenCalledWith('Notification:', message);
  });
});
