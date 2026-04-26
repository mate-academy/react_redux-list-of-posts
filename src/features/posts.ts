/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
import { User } from '../types/User';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Post[],
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: User['id']) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUserPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
