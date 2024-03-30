/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialUserState = {
  posts: Post[];
  isLoadindPosts: boolean;
  hasErrorPosts: boolean;
};

const initialUserState: InitialUserState = {
  posts: [],
  isLoadindPosts: false,
  hasErrorPosts: false,
};

export const initPosts = createAsyncThunk('posts/fetch', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialUserState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initPosts.pending, state => {
        state.isLoadindPosts = true;
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.isLoadindPosts = false;
        state.posts = action.payload;
      })
      .addCase(initPosts.rejected, state => {
        state.hasErrorPosts = true;
        state.isLoadindPosts = false;
      });
  },
});

export default postsSlice.reducer;
