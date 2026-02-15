/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

// Типізація для async thunk
export const loadPosts = createAsyncThunk<Post[], number>(
  'posts/load',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

type InitialState = {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
};

const initialState: InitialState = {
  loaded: false,
  hasError: false,
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
        state.hasError = false;
      },
    );
    builder.addCase(loadPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
