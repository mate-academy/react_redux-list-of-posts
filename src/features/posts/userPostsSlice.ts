/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchUserPosts = createAsyncThunk(
  'users/fetchUserPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export interface UserPostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserPostsState = {
  posts: [],
  status: 'idle',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default postsSlice.reducer;
