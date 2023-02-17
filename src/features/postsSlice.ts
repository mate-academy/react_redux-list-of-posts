/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
import { User } from '../types/User';

export interface PostsState {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (user: User) => {
  return getUserPosts(user.id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.hasError = false;
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
