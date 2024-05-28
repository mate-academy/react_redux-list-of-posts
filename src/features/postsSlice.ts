/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
};

export const initUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.posts.filter(post => post.id !== action.payload);
    },
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initUserPosts.pending, (state: PostsState) => {
        state.status = 'loading';
      })
      .addCase(
        initUserPosts.fulfilled,
        (state: PostsState, action: PayloadAction<Post[]>) => {
          state.status = 'idle';
          state.posts = action.payload;
        },
      )
      .addCase(initUserPosts.rejected, (state: PostsState) => {
        state.status = 'failed';
      });
  },
});

export const { add, remove, clear } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
