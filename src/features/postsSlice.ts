/* eslint-disable no-param-reassign */
import { Post } from '../types/Post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadUsersPosts = createAsyncThunk(
  'posts/loadUsersPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUsersPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadUsersPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadUsersPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
