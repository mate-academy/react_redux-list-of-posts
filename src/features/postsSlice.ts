/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post [],
  loading: boolean,
  errorMessage: string,
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  errorMessage: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    deletePosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.errorMessage = 'Failed to load posts';
      });
  },
});

export const { addPosts, deletePosts } = postsSlice.actions;

export default postsSlice.reducer;
