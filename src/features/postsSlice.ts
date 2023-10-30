/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const setPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(setPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(setPosts.rejected, (state) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
