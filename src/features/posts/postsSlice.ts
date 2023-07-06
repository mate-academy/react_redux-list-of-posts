/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (userId: number) => {
    const data = await getUserPosts(userId);

    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
