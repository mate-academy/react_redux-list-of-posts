/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as postsApi from '../api/posts';
import { Post } from '../types/Post';

export const loadPosts = createAsyncThunk(
  'posts/load',
  async (userId: number) => {
    return postsApi.getUserPosts(userId);
  },
);

const initialState = {
  posts: [] as Post[],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(loadPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
