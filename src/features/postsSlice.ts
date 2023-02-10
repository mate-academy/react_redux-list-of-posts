/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  loaded: boolean
  hasError: boolean
  items: Post[]
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadPosts = createAsyncThunk(
  'posts/set',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(loadPosts.fulfilled, (state) => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { removePosts } = postsSlice.actions;
export default postsSlice.reducer;
