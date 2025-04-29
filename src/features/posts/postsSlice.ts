/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.hasError = action.error.message || 'Something went wrong';
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
