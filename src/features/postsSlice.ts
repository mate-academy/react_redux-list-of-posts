/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  hasError?: boolean;
  loaded: boolean;
}

const initialState: PostsState = {
  posts: [],
  hasError: false,
  loaded: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
