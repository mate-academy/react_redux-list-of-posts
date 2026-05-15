/* eslint-disable no-param-reassign */
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload }: PayloadAction<Post[]>) {
      state.items = payload;
    },
    setLoaded(state, { payload }: PayloadAction<boolean>) {
      state.loaded = payload;
    },
    setError(state, { payload }: PayloadAction<boolean>) {
      state.hasError = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
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
