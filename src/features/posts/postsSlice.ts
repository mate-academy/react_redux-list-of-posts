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
  posts: [] as Post[],
  loaded: true,
  hasError: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: () => ({
      posts: [],
      loaded: true,
      hasError: '',
    }),
  },
  extraReducers(builder) {
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadUserPosts.rejected, (state, action) => {
      state.loaded = true;
      state.hasError = action.error.message || '';
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
