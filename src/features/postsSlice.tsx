/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    const result = await getUserPosts(userId);

    return result;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })

      .addCase(loadUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })

      .addCase(loadUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});
