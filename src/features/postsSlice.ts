/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';

import { Post } from '../types/Post';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const getPosts = createAsyncThunk('posts/fetchPosts', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state: PostsState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        getPosts.fulfilled,
        (state: PostsState, action: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.posts = action.payload;
        },
      )
      .addCase(getPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
