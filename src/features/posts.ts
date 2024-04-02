/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const init = createAsyncThunk('posts/fetch', (id: number) =>
  getUserPosts(id),
);

type StatePosts = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: StatePosts = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
