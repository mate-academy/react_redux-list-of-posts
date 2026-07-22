/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: PostsState = {
  items: [],
  hasError: false,
  loaded: true,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number | null) => {
    if (userId) {
      return getUserPosts(userId);
    }

    return [];
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.hasError = false;
      state.loaded = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.items = [];
      });
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
