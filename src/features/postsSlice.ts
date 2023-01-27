/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type StateType = {
  posts: Post[],
  loaded: boolean;
  hasError: boolean;
};

const initialState: StateType = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  (id:number) => getUserPosts(id),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
      });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
