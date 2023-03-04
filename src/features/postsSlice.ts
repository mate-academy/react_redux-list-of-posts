/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  error: boolean,
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: false,
};

export const loadPosts = createAsyncThunk(
  'posts/SET',
  (async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  }),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
