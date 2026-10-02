/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadUserPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
