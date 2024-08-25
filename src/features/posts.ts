/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface Posts {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: Posts = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clear } = postsSlice.actions;

export default postsSlice.reducer;
