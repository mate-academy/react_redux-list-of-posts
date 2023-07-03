/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type Posts = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: Posts = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;

export const init = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);
