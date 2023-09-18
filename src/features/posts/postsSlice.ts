/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk('fetch/POSTS', (userId: number) => {
  return getUserPosts(userId);
});

export interface PostsState {
  posts: Post[],
  loader: boolean,
  error: boolean,
}

const initialState: PostsState = {
  posts: [],
  loader: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setNotPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loader = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loader = false;
        state.error = true;
      });
  },
});

export const { actions } = postsSlice;

export default postsSlice.reducer;
