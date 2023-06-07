/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export type InitialStateType = {
  status: 'idle' | 'loading' | 'failed',
  posts: Post[],
};
const initialState: InitialStateType = {
  status: 'idle',
  posts: [],
};

export const loadPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  (userId:number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setEmptyPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(loadPostsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setEmptyPosts } = postsSlice.actions;
export const posts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
