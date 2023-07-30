/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface CounterState {
  posts: Post[] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  posts: [],
  status: 'idle',
};

export const getFromServerPost = createAsyncThunk(
  'posts/fetch',
  async (id: number) => {
    return getUserPosts(id);
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    remove: (state) => {
      state.posts = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFromServerPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFromServerPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(getFromServerPost.rejected, (state) => {
        state.status = 'failed';
        state.posts = [];
      });
  },
});

export const { remove } = postSlice.actions;

export default postSlice.reducer;
