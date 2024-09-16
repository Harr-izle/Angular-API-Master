import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Post } from '../interfaces/post';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from API', () => {
    const mockPosts: Post[] = [{
      id: 1, title: 'Test Post', body: 'Post content',
      userId: 0
    }];

    service.getPosts(1, 10).subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts?_page=1&_limit=10&_sort=id&_order=desc`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch a single post by ID', () => {
    const mockPost: Post = {
      id: 1, title: 'Test Post', body: 'Post content',
      userId: 0
    };

    service.getPost(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a new post', () => {
    const newPost: Omit<Post, 'id'> = {
      title: 'New Post', body: 'New content',
      userId: 0
    };
    const createdPost: Post = {
      id: 1, title: 'New Post', body: 'New content',
      userId: 0
    };

    service.createPost(newPost).subscribe(post => {
      expect(post).toEqual(createdPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(createdPost);
  });

  it('should update an existing post', () => {
    const updatedPost: Post = {
      id: 1, title: 'Updated Post', body: 'Updated content',
      userId: 0
    };

    service.updatePost(updatedPost).subscribe(post => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  it('should delete a post by ID', () => {
    service.deletePost(1).subscribe(response => {
      expect(response).toBeUndefined();  
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle errors when fetching posts', () => {
    service.getPosts(1, 10).subscribe(
      () => fail('expected an error'),
      (error) => {
        expect(error.message).toContain('Something bad happened; please try again later.');
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/posts?_page=1&_limit=10&_sort=id&_order=desc`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
