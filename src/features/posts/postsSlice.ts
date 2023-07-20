/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostState {
  value: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostState = {
  value: [],
  status: 'idle',
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
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { reducer, actions } = postsReducer;
