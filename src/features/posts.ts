/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[] | [];
  isLoading: boolean;
  isError: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  isError: false,
};

export const postsInit = createAsyncThunk('posts/fetch', getUserPosts);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postsInit.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(postsInit.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(postsInit.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default postsSlice.reducer;
