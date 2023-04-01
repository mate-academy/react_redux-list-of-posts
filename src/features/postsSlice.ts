/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type StatePosts = {
  posts: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: StatePosts = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = false;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
export const { setSelectedPost } = postsSlice.actions;
