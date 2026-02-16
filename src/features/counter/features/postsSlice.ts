/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

interface SetPostsInterface {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: SetPostsInterface = {
  items: [],
  hasError: false,
  loaded: false,
};

export const getPostsAsync = createAsyncThunk(
  'posts/getUserPostsAsync',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    // The value we return becomes the `fulfilled` action payload
    return userPosts;
  },
);

export const postsSlice: Slice<SetPostsInterface> = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPostsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getPostsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { setPosts, setError, setLoader } = postsSlice.actions;

export default postsSlice.reducer;
