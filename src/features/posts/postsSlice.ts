/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type PostsState = {
  posts: Post[],
  loading: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  hasError: false,
};

export const postsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(postsAsync.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
