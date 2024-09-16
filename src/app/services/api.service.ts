import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/comment';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    const cacheKey = `posts_${page}_${limit}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString())
      .set('_sort', 'id')
      .set('_order', 'desc');

    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { params })
      .pipe(
        retry(3),
        tap(posts => this.cacheService.set(cacheKey, posts)),
        catchError(this.handleError)
      );
  }

  getPost(id: number): Observable<Post> {
    const cacheKey = `post_${id}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`)
      .pipe(
        retry(3),
        tap(post => this.cacheService.set(cacheKey, post)),
        catchError(this.handleError)
      );
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post)
      .pipe(
        tap(newPost => {
          this.addNewPostToCache(newPost);
        }),
        catchError(this.handleError)
      );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post)
      .pipe(
        tap(updatedPost => {
          this.updatePostsCache(updatedPost);
          this.cacheService.set(`post_${updatedPost.id}`, updatedPost);
        }),
        catchError(this.handleError)
      );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`)
      .pipe(
        tap(() => {
          this.removePostFromCache(id);
          this.cacheService.remove(`post_${id}`);
        }),
        catchError(this.handleError)
      );
  }

  getComments(postId: number): Observable<Comment[]> {
    const cacheKey = `comments_${postId}`;
    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`)
      .pipe(
        retry(3),
        tap(comments => this.cacheService.set(cacheKey, comments)),
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

  private addNewPostToCache(newPost: Post): void {
    const cachedPostsKeys = Object.keys(localStorage).filter(key => key.startsWith('posts_'));
    cachedPostsKeys.forEach(key => {
      const posts = this.cacheService.get(key) as Post[];
      const updatedPosts = [newPost, ...posts.filter(p => p.id !== newPost.id)];
      this.cacheService.set(key, updatedPosts.slice(0, posts.length));  
    });
    this.cacheService.set(`post_${newPost.id}`, newPost);
  }

  private updatePostsCache(updatedPost: Post): void {
    const cachedPostsKeys = Object.keys(localStorage).filter(key => key.startsWith('posts_'));
    cachedPostsKeys.forEach(key => {
      const posts = this.cacheService.get(key) as Post[];
      const updatedPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
      this.cacheService.set(key, updatedPosts);
    });
    this.cacheService.set(`post_${updatedPost.id}`, updatedPost);
  }

  private removePostFromCache(id: number): void {
    const cachedPostsKeys = Object.keys(localStorage).filter(key => key.startsWith('posts_'));
    cachedPostsKeys.forEach(key => {
      const posts = this.cacheService.get(key) as Post[];
      const updatedPosts = posts.filter(p => p.id !== id);
      this.cacheService.set(key, updatedPosts);
    });
  }
}