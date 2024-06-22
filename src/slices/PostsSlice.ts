/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { RootState } from '../app/store';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: string;
}

export const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: '',
};

export const initPosts = createAsyncThunk('posts/FETCH', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initPosts.fulfilled, (state, actions) => {
      state.posts = actions.payload;
      state.loaded = true;
    });

    builder.addCase(initPosts.rejected, state => {
      state.hasError = 'error';
      state.loaded = true;
    });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
