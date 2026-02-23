/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';
import { getPosts, getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

const handlePending = (state: PostsState) => {
  state.loading = true;
  state.error = '';
};

const handleFulfilled = (state: PostsState, action: { payload: Post[] }) => {
  state.loading = false;
  state.posts = action.payload;
};

const handleRejected = (state: PostsState) => {
  state.loading = false;
  state.error = 'Something went wrong';
};

export const loadPosts = createAsyncThunk<Post[]>('posts/fetch', getPosts);
export const loadUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchByUser',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = [...action.payload];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, handlePending)
      .addCase(loadPosts.fulfilled, handleFulfilled)
      .addCase(loadPosts.rejected, handleRejected)

      .addCase(loadUserPosts.pending, handlePending)
      .addCase(loadUserPosts.fulfilled, handleFulfilled)
      .addCase(loadUserPosts.rejected, handleRejected);
  },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = { ...postsSlice.actions, loadPosts, loadUserPosts };
