/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const data = await getUserPosts(userId);

    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(postsAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
