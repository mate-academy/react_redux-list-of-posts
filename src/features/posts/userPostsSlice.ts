/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { getUserPosts } from '../../api/posts';

export interface UserPostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: UserPostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    // The value we return becomes the `fulfilled` action payload
    return userPosts;
  },
);

const userPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.items = action.payload;
          state.hasError = false;
        },
      )
      .addCase(fetchUserPosts.rejected, (state) => {
        state.loaded = true;
        state.items = [];
        state.hasError = true;
      });
  },
});

export default userPostsSlice.reducer;
