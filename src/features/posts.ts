/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type Posts = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: Posts = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async userId => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      initPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      },
    );

    builder.addCase(initPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
