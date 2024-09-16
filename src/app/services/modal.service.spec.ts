import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when openModal is called', (done) => {
    service.isOpen$.subscribe(isOpen => {
      expect(isOpen).toBeTruthy();
      done();
    });

    service.openModal(1);
  });

  it('should emit the correct postId when openModal is called', (done) => {
    service.postId$.subscribe(postId => {
      expect(postId).toBe(1);
      done();
    });

    service.openModal(1);
  });

  it('should emit false and null when closeModal is called', (done) => {
    service.openModal(1); // Ensure the modal is open
    service.closeModal();

    service.isOpen$.subscribe(isOpen => {
      expect(isOpen).toBeFalsy();
    });

    service.postId$.subscribe(postId => {
      expect(postId).toBeNull();
      done();
    });
  });
});
