/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: '',
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.hasError = '';
      state.loaded = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadPosts.rejected, (state, action) => {
      state.hasError = action.error.message || '';
      state.loaded = false;
    });
  },
});

export default postsSlice.reducer;
