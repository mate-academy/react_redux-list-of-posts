/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface UserPostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UserPostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'userPosts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { set } = userPostsSlice.actions;
