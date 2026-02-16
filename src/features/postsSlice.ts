/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostSlice = {
  items: Post[];
  loaded: boolean;
  error: boolean;
};

const initialState: PostSlice = {
  items: [],
  loaded: false,
  error: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadUserPosts.rejected, state => {
      state.loaded = true;
      state.error = true;
    });
  },
});

export const postReducer = postSlice.reducer;
export const { setPost } = postSlice.actions;
