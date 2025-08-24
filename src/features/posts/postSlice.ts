/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.items = [];
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
