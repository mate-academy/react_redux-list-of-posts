/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Error } from '../types/Error';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk(
  'posts/fetch',
  async (id: number, { rejectWithValue }) => {
    const response: Post[] | Error = await getUserPosts(id);

    return Array.isArray(response) ? response : rejectWithValue('error');
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initPosts.pending, (state) => {
        state.loaded = true;
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.loaded = false;
        state.posts = action.payload;
      })
      .addCase(initPosts.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
