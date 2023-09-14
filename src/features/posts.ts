/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  posts: Post[],
  loading: boolean,
  error: string,
};

const initialState: State = {
  posts: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.error = 'Something went wrong';
      });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
