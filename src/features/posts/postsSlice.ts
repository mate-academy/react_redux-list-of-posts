/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { AsyncStatus } from '../../types/AsyncStatus';

export interface PostState {
  value: Post[];
  status: AsyncStatus;
}

const initialState: PostState = {
  value: [],
  status: AsyncStatus.IDLE,
};

export const incrementAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const users = await getUserPosts(userId);

    return users;
  },
);

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const { reducer, actions } = postsReducer;
