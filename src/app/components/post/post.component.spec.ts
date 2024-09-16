import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostComponent } from './post.component';
import { Post } from '../../interfaces/post';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const mockPost: Post = {
    id: 1,
    title: 'Test Post Title',
    body: 'Test Post Body',
    userId: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = mockPost; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the post title', () => {
    const titleElement = fixture.debugElement.query(By.css('.post-title')).nativeElement;
    expect(titleElement.textContent).toContain(mockPost.title);
  });

  it('should display the post body', () => {
    const bodyElement = fixture.debugElement.query(By.css('.post-body')).nativeElement;
    expect(bodyElement.textContent).toContain(mockPost.body);
  });

  it('should handle click events', () => {
    spyOn(component, 'onPostClick'); // Assuming you have a method to handle clicks
    const postElement = fixture.debugElement.query(By.css('.post')).nativeElement;
    postElement.click();
    expect(component.onPostClick).toHaveBeenCalled();
  });
});
