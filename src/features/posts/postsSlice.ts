/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostsByUser = createAsyncThunk(
  'posts/loadByUser',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPostsByUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadPostsByUser.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});
