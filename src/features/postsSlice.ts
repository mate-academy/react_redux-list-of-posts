/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;

      state.loaded = true;
    });
    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});
