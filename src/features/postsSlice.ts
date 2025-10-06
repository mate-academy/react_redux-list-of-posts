/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Post[],
};

export const loadPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set(state, { payload }: PayloadAction<Post[]>) {
      state.items = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        loadPosts.fulfilled,
        (state, { payload }: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.items = payload;
        },
      )
      .addCase(loadPosts.rejected, state => {
        state.loaded = false;
        state.hasError = true;
        state.items = [];
      });
  },
});

export default posts.reducer;
