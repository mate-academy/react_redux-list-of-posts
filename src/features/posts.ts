/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as postsApi from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => postsApi.getUserPosts(userId),
);

const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(
      getUserPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );
    builder.addCase(getUserPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default posts.reducer;
export const { setPosts } = posts.actions;
