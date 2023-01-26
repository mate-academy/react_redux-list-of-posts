/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk(
  'posts/fetch',
  (postId: number) => getUserPosts(postId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(initPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
