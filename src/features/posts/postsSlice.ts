/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  value: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  status: 'idle',
};

export const loadUserPosts = createAsyncThunk(
  'posts/getUserPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    // The value we return becomes the `fulfilled` action payload
    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(loadUserPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
