/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const loadUserPosts = createAsyncThunk('fetch/posts', (userId: number) =>
  getUserPosts(userId),
);

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState: {
    isLoading: false,
    hasError: false,
    selectedPost: null as Post | null,
    posts: [] as Post[],
  },
  reducers: {
    setSelectedPost: (state, { payload }: PayloadAction<Post | null>) => {
      state.selectedPost = payload;
    },
    clearUserPosts: state => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        loadUserPosts.fulfilled,
        (state, { payload }: PayloadAction<Post[]>) => {
          state.isLoading = false;
          state.posts = payload;
        },
      )
      .addCase(loadUserPosts.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
