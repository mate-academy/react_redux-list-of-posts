/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', (id: number) => {
  return getUserPosts(id);
});
type State = {
  posts: Post[],
  post: Post | null,
  loaded: boolean,
  error: string | null,
};

const initialState: State = {
  posts: [],
  post: null,
  loaded: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },

    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loaded = true;
        state.error = 'error';
      });
  },
});

export const { setPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
