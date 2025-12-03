/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';

type State = {
  user: User | null;
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  user: null,
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default postsSlice.reducer;
