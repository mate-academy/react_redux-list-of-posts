/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { setPosts } from './postsAPI';

export interface PostsState {
  items: Post[],
  selected: Post | null,
  loaded: boolean,
  hasError: boolean,
}

export const initialState: PostsState = {
  items: [],
  selected: null,
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost(state, { payload }) {
      const selected = state.items.find(({ id }) => id === payload);

      if (selected) {
        state.selected = selected;
      }
    },
    clearSelectedPost(state) {
      state.selected = null;
    },
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

export const { selectPost, clearSelectedPost } = postsSlice.actions;
