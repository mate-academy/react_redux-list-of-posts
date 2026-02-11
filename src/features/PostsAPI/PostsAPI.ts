/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
