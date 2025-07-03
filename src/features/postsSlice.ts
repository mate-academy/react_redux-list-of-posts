/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface UsersState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk(
  'posts/fetchPosts',
  (userId: Post['userId']) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.items = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
      state.items = [];
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
