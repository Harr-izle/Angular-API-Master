import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { DeleteModalComponent } from './delete-modal.component';
import { ModalService } from '../../services/modal.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../state/post.state';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let modalService: ModalService;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent],
      providers: [
        provideMockStore(),
        { provide: ModalService, useValue: { isOpen$: of(true), postId$: of(1), closeModal: jest.fn() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    store = TestBed.inject(MockStore) as MockStore<AppState>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal on Cancel button click', () => {
    // Arrange
    const closeModalSpy = jest.spyOn(modalService, 'closeModal');

    // Act
    const cancelButton = fixture.nativeElement.querySelector('button.cancel');
    cancelButton.click();

    // Assert
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call deletePost on Confirm button click', () => {
    // Arrange
    const deletePostSpy = jest.spyOn(store, 'dispatch');
    const confirmButton = fixture.nativeElement.querySelector('button.confirm');

    // Act
    confirmButton.click();

    // Assert
    expect(deletePostSpy).toHaveBeenCalled();  // Adjust according to your actual action and state
  });

  it('should handle ModalService observables correctly', () => {
    // Arrange
    const spy = jest.spyOn(console, 'log');  // Assuming you have logging or other output in your component

    // Act
    component.ngOnInit();  // If you use ngOnInit for subscription

    // Assert
    expect(spy).toHaveBeenCalledWith('Notification:', 'Test message');  // Adjust as needed
  });
});
