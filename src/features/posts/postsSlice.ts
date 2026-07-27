/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const res = await getUserPosts(userId);

    return res;
  },
);

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
