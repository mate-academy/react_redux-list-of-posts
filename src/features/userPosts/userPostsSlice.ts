/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export interface UserPostsState {
  items: Post[];
  isLoaded: boolean;
  hasError: boolean;
}

const initialState: UserPostsState = {
  items: [],
  isLoaded: true,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.isLoaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
