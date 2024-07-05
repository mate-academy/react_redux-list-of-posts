/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { reset } = postsSlice.actions;
