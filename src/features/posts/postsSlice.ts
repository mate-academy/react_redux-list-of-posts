/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  userId => {
    const response = getUserPosts(userId);

    return response;
  },
);

const initialState: {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean;
} = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.isLoading = false;
          state.posts = action.payload;
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
