/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { Status } from '../types/Status';

export interface PostsState {
  posts: Post[];
  status: Status;
  error: boolean,
}

const initialState: PostsState = {
  posts: [],
  status: Status.idle,
  error: false,
};

export const loadPosts = createAsyncThunk(
  'posts/SET',
  (async (userId: number) => {
    return await getUserPosts(userId);
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
        state.status = Status.loading;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = Status.idle;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = Status.failed;
        state.error = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
