/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadPosts } from './postsAsyncActions';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },

  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
      },
    );

    builder.addCase(loadPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
