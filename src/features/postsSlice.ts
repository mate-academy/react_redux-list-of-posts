import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => ({
      ...state,
      hasError: false,
      loading: true,
    }));
    builder.addCase(fetchPosts.fulfilled, (state, action) => ({
      ...state,
      hasError: false,
      items: action.payload,
      loading: false,
    }));
    builder.addCase(fetchPosts.rejected, state => ({
      ...state,
      hasError: true,
      loading: false,
    }));
  },
});

export default postsSlice.reducer;
