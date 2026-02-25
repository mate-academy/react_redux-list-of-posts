/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number, thunkAPI) => {
    try {
      const posts = await getUserPosts(userId);

      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load posts');
    }
  },
);

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loaded = true;
        state.hasError = action.payload as string;
      });
  },
});

export default postSlice.reducer;
