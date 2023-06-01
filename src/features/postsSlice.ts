/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post[];
  isLoaded: boolean;
  hasError: boolean;
}

export const initialState: PostsState = {
  posts: [],
  isLoaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const postsFromServer = await getUserPosts(id);

    return postsFromServer;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
