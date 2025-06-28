/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  items: [] as Post[],
  loaded: false as boolean,
  error: false as boolean,
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'users/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.error = true;
      });
  },
});

export default postsSlice.reducer;
