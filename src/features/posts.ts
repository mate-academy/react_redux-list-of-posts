/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[] | null,
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: null,
  loaded: true,
  hasError: false,
};

export const postsAsync = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(postsAsync.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(postsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(postsAsync.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
