/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialPost: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPost,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(initPosts.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
