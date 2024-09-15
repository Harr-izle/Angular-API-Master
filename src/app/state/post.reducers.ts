import { createReducer, on } from '@ngrx/store';
import { Post} from '../interfaces/post';
import { Comment } from '../interfaces/comment';
import * as PostActions from './post.actions';

export interface PostState {
  posts: Post[];
  comments: { [postId: number]: Comment[] };
  loading: boolean;
  error: any;
}

export const initialState: PostState = {
  posts: [],
  comments: {},
  loading: false,
  error: null
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.loadPosts, state => ({ ...state, loading: true })),
  on(PostActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false })),
  on(PostActions.loadPostsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(PostActions.createPostSuccess, (state, { post }) => ({ ...state, posts: [...state.posts, post] })),
  on(PostActions.updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.map(p => p.id === post.id ? post : p)
  })),
  on(PostActions.deletePostSuccess, (state, { id }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== id)
  })),
  on(PostActions.loadCommentsSuccess, (state, { postId, comments }) => ({
    ...state,
    comments: { ...state.comments, [postId]: comments }
  }))
);
