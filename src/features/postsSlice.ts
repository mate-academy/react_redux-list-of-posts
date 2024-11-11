/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[] | [];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: false,
};

export const loadUserPost = createAsyncThunk(
  'posts/fetchUsersPosts',
  (id: number) => getUserPosts(id),
);

export const userPostsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPost.pending, state => {
        state.loaded = false;
      })
      .addCase(loadUserPost.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(loadUserPost.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default userPostsSlice.reducer;
