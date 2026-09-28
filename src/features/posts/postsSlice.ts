/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
