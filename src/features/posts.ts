/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  loaded: boolean;
  hasError: string;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: '',
  items: [],
};

export const featchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(featchPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(
        featchPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(featchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = 'Error';
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
