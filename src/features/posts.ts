/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initPosts.pending, state => {
        state.loading = false;
        state.hasError = false;
        state.posts = [];
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.loading = true;
        state.posts = action.payload;
        state.hasError = false;
      })
      .addCase(initPosts.rejected, state => {
        state.loading = true;
        state.hasError = true;
        state.posts = [];
      });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
