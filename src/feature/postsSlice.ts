import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import type { Post } from '../types/Post';

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const loadPost = createAsyncThunk('posts/fetch', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loadPost.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadPost.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
