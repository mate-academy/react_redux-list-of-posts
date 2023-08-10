/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder, createAsyncThunk, createSlice,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const get = createAsyncThunk(
  'posts/get',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PostsState>) => {
    builder
      .addCase(get.pending, (state) => {
        state.loaded = false;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(get.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
