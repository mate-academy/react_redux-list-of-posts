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

export const postsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postsAsync.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(postsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
