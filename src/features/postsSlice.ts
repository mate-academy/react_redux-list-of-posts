/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialType = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialType = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
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
export const { clearPosts } = postsSlice.actions;
