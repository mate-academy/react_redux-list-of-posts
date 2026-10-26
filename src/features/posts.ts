import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const initPosts = createAsyncThunk('posts/init', (userId: number) =>
  getUserPosts(userId),
);

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(initPosts.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(initPosts.fulfilled, (_state, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(initPosts.rejected, () => ({
        loaded: true,
        hasError: true,
        items: [],
      }));
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
