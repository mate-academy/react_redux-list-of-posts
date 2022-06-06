/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

export interface PostsState {
  posts: Post[];
  isPostsLoading: boolean,
  postsLoadingError: boolean,
  isPostDetailLoading: boolean,
  postsDetailError: boolean,
  currentPostId: number,
  currentPost: Post | null,
  currentUserId: number,
  postComments: Comment[],
}

const initialState: PostsState = {
  posts: [],
  isPostsLoading: false,
  postsLoadingError: false,
  isPostDetailLoading: false,
  postsDetailError: false,
  currentPostId: 0,
  currentPost: null,
  currentUserId: 0,
  postComments: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsLoading(state) {
      state.isPostsLoading = true;
    },
    postsLoadSuccess(state, action: PayloadAction<Post[]>) {
      state.isPostsLoading = false;
      state.postsLoadingError = false;
      state.posts = action.payload;
    },
    postsLoadError(state) {
      state.isPostsLoading = false;
      state.postsLoadingError = true;
    },
    postDetailLoading(state) {
      state.isPostDetailLoading = true;
    },
    postDetailLoadSuccess(state, action: PayloadAction<Post>) {
      state.isPostDetailLoading = false;
      state.postsDetailError = false;
      state.currentPost = action.payload;
      state.currentPostId = action.payload.id;
    },
    postDetailLoadError(state) {
      state.isPostDetailLoading = false;
      state.postsDetailError = true;
    },
    selectUser(state, action: PayloadAction<number>) {
      state.currentUserId = action.payload;
    },
    closePost(state) {
      state.currentPost = null;
      state.currentPostId = 0;
    },
    deletePost(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
  },
});

export default postsSlice.reducer;
