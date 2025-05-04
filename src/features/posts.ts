import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

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

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);
/* eslint-disable no-param-reassign */
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
      state.hasError = false;
      state.loaded = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchUserPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});
/* eslint-enable no-param-reassign */

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
