import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  posts: Post[],
  loading: boolean,
  error: null | string,
};

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const initPosts = createAsyncThunk('posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  });

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(initPosts.rejected, (state) => {
      state.error = 'Unable to load posts from server';
      state.loading = false;
    });
  },
});

export default postsSlice.reducer;
