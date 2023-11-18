/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const setAuthorPosts = createAsyncThunk(
  'posts/fetchAuthorPosts',
  (authorId: number) => getUserPosts(authorId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAuthorPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(setAuthorPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(setAuthorPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
