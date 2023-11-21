/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type InitialState = {
  posts: Post[],
  loaded:boolean,
  hasError: boolean,
};

const initialState:InitialState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch',
  (userId:number) => {
    return getUserPosts(userId) || 0;
  });

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.hasError = false;
      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = false;
      state.hasError = false;
      state.posts = action.payload;
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
