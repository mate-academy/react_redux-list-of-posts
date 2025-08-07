import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default postsSlice.reducer;
