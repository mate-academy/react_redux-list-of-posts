/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  error: string;
  loading: boolean;

  posts: Post[];
};

const initialState: State = {
  error: '',
  loading: false,

  posts: [],
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const usersSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = [...action.payload];
      },
    );

    builder.addCase(loadPosts.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export default usersSlice.reducer;
