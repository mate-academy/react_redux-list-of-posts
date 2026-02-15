/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initAuthorPosts = createAsyncThunk(
  'posts/initPosts',
  async (authorID: number) => {
    const value = await getUserPosts(authorID);

    return value;
  },
);

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(initAuthorPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initAuthorPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(initAuthorPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default PostsSlice.reducer;
