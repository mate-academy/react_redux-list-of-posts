/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsStateType = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsStateType = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});
