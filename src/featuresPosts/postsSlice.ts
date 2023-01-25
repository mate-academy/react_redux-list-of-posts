/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (authorId: number) => {
  return getUserPosts(authorId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },

});

export default postsSlice.reducer;
