import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './post.state';
import { PostState } from './post.reducers';
import { Post } from '../interfaces/post';

export const selectPostState = createFeatureSelector<AppState, PostState>('posts');

export const selectAllPosts = createSelector(
  selectPostState,
  (state: PostState) => state.posts
);

// export const selectPostById = (id: number) => createSelector(
//   selectAllPosts,
//   (posts) => posts.find(post => post.id === id)
// );
export const selectPostById = (id: number) =>
  createSelector(
    selectAllPosts,
    (posts: Post[]) => posts.find(post => post.id === id)
  );

export const selectCommentsByPostId = (postId: number) => createSelector(
  selectPostState,
  (state: PostState) => state.comments[postId] || []
);

export const selectPostsLoading = createSelector(
  selectPostState,
  (state: PostState) => state.loading
);

export const selectPostsError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);
