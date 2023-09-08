/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[];
  hasError: boolean,
  loaded: boolean,
}

const initialState: PostsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
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
      .addCase(fetchPosts.pending, (state: PostsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (
        state: PostsState,
        action: PayloadAction<Post[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state: PostsState) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
