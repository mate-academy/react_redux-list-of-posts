/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',

  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        // console.log('Posts loaded:', action.payload);

        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoaded = (state: RootState) => state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.hasError;

export default postsSlice.reducer;
