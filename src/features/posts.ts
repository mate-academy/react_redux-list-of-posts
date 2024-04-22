import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(initPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
