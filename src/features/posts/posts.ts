/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export interface InitialState {
  items: Array<Post> | [],
  isLoaded: boolean,
  isError: boolean,
}

const initialState: InitialState = {
  items: [],
  isLoaded: false,
  isError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoaded = false;
      state.isError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoaded = true;
      state.isError = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.isLoaded = false;
      state.isError = true;
      state.items = [];
    });
  },
});

export default postsSlice.reducer;
