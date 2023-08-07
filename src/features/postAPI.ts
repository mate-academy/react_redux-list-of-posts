/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { Status } from '../enum/enum';

export interface CounterState {
  posts: Post[] | [];
  status: Status;
}

const initialState: CounterState = {
  posts: [],
  status: Status.idle,
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
      state.status = Status.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFromServerPost.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(getFromServerPost.fulfilled, (state, action) => {
        state.status = Status.idle;
        state.posts = action.payload;
      })
      .addCase(getFromServerPost.rejected, (state) => {
        state.status = Status.failed;
        state.posts = [];
      });
  },
});

export const { remove } = postSlice.actions;

export default postSlice.reducer;
