/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';

export interface PostState {
  items: Post[];
  loading: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
