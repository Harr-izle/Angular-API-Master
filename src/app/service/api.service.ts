
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Post} from '../interfaces/post';
import { Comment } from '../interfaces/comment';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor( private http: HttpClient,
    private cacheService: CacheService) {
      console.log(this.apiUrl);
      
    }

  // getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
  //   const params = new HttpParams()
  //     .set('_page', page.toString())
  //     .set('_limit', limit.toString());

  //   return this.http.get<Post[]>(`${this.apiUrl}/posts`, { params })
  //     .pipe(
  //       retry(3),
  //       catchError(this.handleError)
  //     );
  // }
  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    console.log('ApiService: getPosts called', { page, limit });
    const cacheKey = `posts_${page}_${limit}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      console.log('ApiService: Returning cached data', cachedData)
      return of(cachedData);
    }

    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { params })
      .pipe(
        retry(3),
        tap(posts => this.cacheService.set(cacheKey, posts)),
        catchError(this.handleError)
      );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  clearCache(): void {
    this.cacheService.clear();
  }
}
