/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
      state.selectedPost = null;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(initPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
