/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts } from '../../api/posts';

type PostsState = {
  posts: Post[]
  postError: string
  loadingPosts: boolean
};

const initialState: PostsState = {
  posts: [],
  postError: '',
  loadingPosts: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    remove(state) {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(posts.pending, state => {
        state.loadingPosts = true;
      })
      .addCase(posts.fulfilled, (state, action) => {
        state.loadingPosts = false;
        state.posts = action.payload;
      })
      .addCase(posts.rejected, state => {
        state.loadingPosts = false;
        state.postError = 'Error';
      });
  },
});

export default postsSlice.reducer;

export const { remove } = postsSlice.actions;

export const posts = createAsyncThunk('posts/fetch', () => {
  return getPosts();
});
