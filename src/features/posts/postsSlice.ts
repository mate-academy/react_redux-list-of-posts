/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (id: number) => {
    const posts = await getUserPosts(id);

    return posts;
  },
);

type State = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: State = {
  posts: [],
  loading: false,
  error: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export const selectPostState = (state: RootState) => state.posts;
export default postsSlice.reducer;
