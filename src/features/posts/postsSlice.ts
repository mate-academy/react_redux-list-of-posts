/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { RootState } from '../../app/store';

export interface PostState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const loadedPosts = await getUserPosts(id);

    return loadedPosts;
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPostsAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(loadPostsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadPostsAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clear } = postSlice.actions;
export default postSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.items;
export const selectHasError = (state: RootState) => state.posts.hasError;
export const selectLoaded = (state: RootState) => state.posts.loaded;
