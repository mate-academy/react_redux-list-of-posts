import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[],
  isLoading: boolean,
  error: boolean,
};

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (value: number) => {
  return getUserPosts(value);
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      if (action.payload) {
        state.posts = action.payload;
      }

      state.isLoading = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default postSlice.reducer;
