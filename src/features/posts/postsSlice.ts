/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (userId: number) => {
    const data = await getUserPosts(userId);

    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default postsSlice.reducer;
