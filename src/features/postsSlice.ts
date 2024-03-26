/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const initialState: PostsState = {
  loaded: true,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { actions } = postsSlice;
export const postsThunks = { init };
export default postsSlice.reducer;
