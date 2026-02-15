/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (_, { getState }) => {
    const state = getState() as RootState;

    return getUserPosts(state.posts.userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    userId: -1,
    items: [] as Post[],
    hasError: false,
    loaded: false,
  },
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setUserId } = postsSlice.actions;
export default postsSlice.reducer;
