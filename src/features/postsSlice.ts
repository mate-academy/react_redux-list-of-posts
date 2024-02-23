/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const postsData = await getUserPosts(userId);

    return postsData;
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state: PostsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled,
        (state: PostsState, action: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.items = action.payload;
        })
      .addCase(fetchPosts.rejected, (state: PostsState) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});
