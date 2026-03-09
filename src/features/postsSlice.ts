import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
/* eslint-disable no-param-reassign */

type InitialState = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: InitialState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const getPosts = createAsyncThunk('fetch/posts', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, state => {
      state.hasError = '';
      state.loaded = true;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(getPosts.rejected, state => {
      state.loaded = false;
      state.hasError = 'Fetch Post Error';
    });
  },
});

export default postsSlice.reducer;
