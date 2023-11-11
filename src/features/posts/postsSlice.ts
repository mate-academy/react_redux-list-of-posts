/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as postsApi from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  value: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  status: 'idle',
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const value = await postsApi.getUserPosts(id);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deleteUserPosts: (state) => {
      state.value = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = [...action.payload];
      })
      .addCase(loadUserPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { deleteUserPosts } = postsSlice.actions;

export default postsSlice.reducer;
