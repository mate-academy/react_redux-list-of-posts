/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
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
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
