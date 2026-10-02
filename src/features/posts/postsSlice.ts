/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
export const loadPosts = createAsyncThunk('posts/load', (id: number) =>
  getUserPosts(id),
);
const slice = createSlice({
  name: 'posts',
  initialState: { loaded: false, hasError: false, items: [] as Post[] },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        if (!action.meta.aborted) {
          state.hasError = true;
          state.loaded = true;
        }
      });
  },
});

export default slice.reducer;
