/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { setPosts } from './postsAPI';

export interface PostsState {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
}

export const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(setPosts.fulfilled, (state, { payload }) => {
        state.loaded = true;
        state.items = payload;
      })
      .addCase(setPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
