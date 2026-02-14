/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (userId: number) => getUserPosts(userId),
);

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
