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
  reducers: {
    setPosts: () => ({
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers(builder) {
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.items = action.payload;
    });
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
