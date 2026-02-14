/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  postList: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  postList: [],
  selectedPost: null,
  isLoading: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.postList = action.payload;
    });
    builder.addCase(initPosts.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
