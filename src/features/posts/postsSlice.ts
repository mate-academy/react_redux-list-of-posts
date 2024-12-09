/* eslint-disable no-param-reassign */
import { Post } from '../../types/Post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';

export const loadPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userID: number) => {
    return getUserPosts(userID);
  },
);

const initialState = {
  posts: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
