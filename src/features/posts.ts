/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  posts: [] as Post[],
  hasError: false,
  loaded: true,
};

export const setPosts = createAsyncThunk('posts/set', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsNull: state => {
      // eslint-disable-next-line no-param-reassign
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(setPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(setPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(setPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setPostsNull } = postsSlice.actions;

export default postsSlice.reducer;
