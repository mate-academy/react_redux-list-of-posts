/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const initPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(initPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
