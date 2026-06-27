/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

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

export const init = createAsyncThunk('posts/init', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(init.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clear } = postsSlice.actions;

export default postsSlice.reducer;
