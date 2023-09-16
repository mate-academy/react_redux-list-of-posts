/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';

import { Post } from '../types/Post';
import type { RootState } from '../app/store';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
};

const initialPosts: InitialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const fetchPosts = createAsyncThunk('posts/fetch', (auth: number) => {
  return auth ? getUserPosts(auth) : [];
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
export const postsStates = (state: RootState) => state.posts;
