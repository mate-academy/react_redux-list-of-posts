/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosts } from '../api/posts';
import { Post } from '../types/Post';
// eslint-disable-next-line import/no-cycle

export interface PostsState {
  items: Post[];
  isLoaded: boolean;
  hasError: string;
}

const initialState: PostsState = {
  items: [],
  isLoaded: false,
  hasError: '',
};

export const init = createAsyncThunk(
  'posts/fetch', () => {
    return getPosts();
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
    resetPosts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.isLoaded = true;
      });
    builder
      .addCase(init.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.items = action.payload;
      });
    builder
      .addCase(init.rejected, (state) => {
        state.isLoaded = false;
        state.hasError = 'failed to load posts';
      });
  },
});

export const {
  resetPosts,
  setPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
