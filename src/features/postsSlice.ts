/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostState = {
  posts: [],
  loading: false,
  error: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  async (id: number, { rejectWithValue }) => {
    try {
      const posts = await getUserPosts(id);

      return posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
