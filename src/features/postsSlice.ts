/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostType = {
  items: Post[];
  loaded: boolean;
  error: string;
};

const initialState: PostType = {
  items: [],
  loaded: true,
  error: '',
};

export const fetchPostsAsync = createAsyncThunk(
  'comments/fetchUserPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

const postsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchPostsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostsAsync.rejected, state => {
        state.error = 'Something went wrong';
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
