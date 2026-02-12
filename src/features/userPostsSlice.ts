/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type UserPostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UserPostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const userPostsFetch = createAsyncThunk(
  'userPosts/fetch',
  (userId: number) => getUserPosts(userId),
);

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(userPostsFetch.pending, state => {
      state.loaded = false;
    });
    builder.addCase(userPostsFetch.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(userPostsFetch.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default userPostsSlice.reducer;
export const { clearPosts } = userPostsSlice.actions;
