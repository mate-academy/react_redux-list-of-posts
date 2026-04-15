/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './postsAPI';
import { RootState } from '../../app/store';

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

export const postsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await fetchPosts(userId);

    return value; // This is action payload, POSTS fro example
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postsAsync.pending, state => {
        state.loaded = false; // Change status
        state.hasError = false;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload; // Set posts
      })
      .addCase(postsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const postsList = (state: RootState) => state.posts.items;
export const postsLoaded = (state: RootState) => state.posts.loaded;
export const postsHasError = (state: RootState) => state.posts.hasError;

export default postsSlice.reducer;
