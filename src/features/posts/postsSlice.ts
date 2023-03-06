/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  status: 'loaded' | 'hasError' | 'items';
}

const initialState: PostsState = {
  posts: [],
  status: 'loaded',
};

export const userPostssAsync = createAsyncThunk(
  'posts/userPostsAsync',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userPostssAsync.pending, (state) => {
        state.posts = [];
        state.status = 'loaded';
      })
      .addCase(userPostssAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'items';
      })
      .addCase(userPostssAsync.rejected, (state) => {
        state.posts = [];
        state.status = 'hasError';
      });
  },
});

export default postsSlice.reducer;
