/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  status: Status;
}

const initialState: PostsState = {
  posts: [],
  status: Status.Inaction,
};

export const getPostsAsyncBy = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsyncBy.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getPostsAsyncBy.fulfilled, (state, action) => {
        state.status = Status.Inaction;
        state.posts = action.payload;
      })
      .addCase(getPostsAsyncBy.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
