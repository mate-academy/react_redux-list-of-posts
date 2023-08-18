/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPosts.pending, (state) => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'idle';
        state.loaded = true;
      })
      .addCase(loadUserPosts.rejected, (state) => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
