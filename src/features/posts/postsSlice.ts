import { createSlice } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';

import { fetchPosts } from './postsThunk';

interface PostsState {
  items: Post[];

  loaded: boolean;

  hasError: boolean;
}

const initialState: PostsState = {
  items: [],

  loaded: false,

  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    clearPosts(state) {
      state.items = [];

      state.loaded = false;

      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(fetchPosts.pending, state => {
        state.items = [];

        state.loaded = false;

        state.hasError = false;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;

        state.loaded = true;

        state.hasError = false;
      })

      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;

        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
