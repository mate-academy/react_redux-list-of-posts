/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsSlice = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

export const incrementPosts = createAsyncThunk(
  'post/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clear: (state: PostsSlice) => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(incrementPosts.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(incrementPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(incrementPosts.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const { clear } = postSlice.actions;
export default postSlice.reducer;
