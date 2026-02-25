/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  posts: [] as Post[],
  hasError: false,
  loaded: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
