import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffects {
  // loadPosts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PostActions.loadPosts),
  //     mergeMap(({ page, limit }) =>
  //       this.apiService.getPosts(page, limit).pipe(
  //         tap(() => console.log('Posts loaded')),
  //         map(posts => PostActions.loadPostsSuccess({ posts })),
  //         catchError(error => of(PostActions.loadPostsFailure({ error })))
  //       )
  //     )
  //   )
  // );
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      tap(() => console.log('PostEffects: loadPosts action received')),
      mergeMap(({ page, limit }) =>
        this.apiService.getPosts(page, limit).pipe(
          map((posts) => {
            console.log('PostEffects: Posts loaded successfully', posts);
            return PostActions.loadPostsSuccess({ posts });
          }),
          catchError((error) => {
            console.error('PostEffects: Error loading posts', error);
            return of(PostActions.loadPostsFailure({ error }));
          })
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      mergeMap(({ post }) =>
        this.apiService.createPost(post).pipe(
          map((createdPost) =>
            PostActions.createPostSuccess({ post: createdPost })
          ),
          catchError((error) => of(PostActions.createPostFailure({ error })))
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      mergeMap(({ post }) =>
        this.apiService.updatePost(post).pipe(
          map((updatedPost) =>
            PostActions.updatePostSuccess({ post: updatedPost })
          ),
          catchError((error) => of(PostActions.updatePostFailure({ error })))
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      mergeMap(({ id }) =>
        this.apiService.deletePost(id).pipe(
          map(() => PostActions.deletePostSuccess({ id })),
          catchError((error) => of(PostActions.deletePostFailure({ error })))
        )
      )
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadComments),
      mergeMap(({ postId }) =>
        this.apiService.getComments(postId).pipe(
          map((comments) =>
            PostActions.loadCommentsSuccess({ postId, comments })
          ),
          catchError((error) => of(PostActions.loadCommentsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
