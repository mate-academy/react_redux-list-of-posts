/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.items;

export const selectPostsLoaded = (state: RootState) => state.posts.loaded;

export const selectPostsError = (state: RootState) => state.posts.hasError;

export default postsSlice.reducer;
