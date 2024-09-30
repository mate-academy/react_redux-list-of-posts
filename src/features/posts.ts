/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[] | [];
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const postsInit = createAsyncThunk('posts/fetch', async (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postsInit.pending, state => {
      state.loading = true;
    });
    builder.addCase(postsInit.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(postsInit.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default postsSlice.reducer;
