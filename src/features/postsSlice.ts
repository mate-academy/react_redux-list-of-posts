/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const fetchUsersPosts = createAsyncThunk(
  'posts/fetch', async (userId: number) => {
    const usersPosts = await getUserPosts(userId);

    return usersPosts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersPosts.pending, (state) => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(fetchUsersPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsersPosts.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default postsSlice.reducer;
