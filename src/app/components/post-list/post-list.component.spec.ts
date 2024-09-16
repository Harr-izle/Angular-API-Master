import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostListComponent } from './post-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../state/post.state';
import * as PostSelectors from '../../state/post.selectors';
import { Post } from '../../interfaces/post';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let store: MockStore<AppState>;

  const initialState = { posts: [] }; // Adjust based on your actual state

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select posts from store', () => {
    // Arrange
    const posts: Post[] = [
      { id: 1, title: 'Test Post 1', body: 'Test Body 1', userId: 1 },
      { id: 2, title: 'Test Post 2', body: 'Test Body 2', userId: 2 }
    ];

    store.overrideSelector(PostSelectors.selectAllPosts, posts);

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.posts).toEqual(posts);
  });

  it('should call loadPosts on initialization', () => {
    // Arrange
    const loadPostsSpy = jest.spyOn(component, 'loadPosts').mockImplementation();

    // Act
    component.ngOnInit();

    // Assert
    expect(loadPostsSpy).toHaveBeenCalled();
  });

  it('should handle empty posts array', () => {
    // Arrange
    store.overrideSelector(PostSelectors.selectAllPosts, []);

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.posts).toEqual([]);
  });
});
