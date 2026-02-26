import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

/* eslint-disable no-param-reassign */

const initialState = {
  items: [] as Post[],
  hasError: '',
  loaded: false,
};

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.hasError = action.error.message || 'Something went wrong';
      state.loaded = false;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
