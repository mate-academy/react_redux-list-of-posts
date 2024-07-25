/* eslint-disable no-param-reassign */
/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';

type initialPosts = {
  posts: Post[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: initialPosts = {
  posts: [],
  hasError: false,
  loaded: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(postsAsync.pending, state => {
      state.loaded = false;
    }),
      builder.addCase(postsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      }),
      builder.addCase(postsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const postsAsync = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
