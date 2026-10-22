/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});
