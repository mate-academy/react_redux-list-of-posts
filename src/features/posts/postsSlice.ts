import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const postsReducer = postsSlice.reducer;
