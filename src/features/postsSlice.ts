/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPosts } from '../app/thunks';
import { Post } from '../types/Post';

export interface PostsSliceIS {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsSliceIS = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
