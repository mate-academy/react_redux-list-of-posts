import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  getUserPosts,
);

/* eslint-disable no-param-reassign */

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const selectors = {
  getPosts: (state: PostsState) => state.posts,
  getPostsState: (state: PostsState) => state,
};

export default postsSlice.reducer;
