/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

export interface SetPostInterface {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: SetPostInterface = {
  items: [],
  hasError: false,
  loaded: false,
};

export const getPostsAsync = createAsyncThunk(
  'posts/getPostsAsync',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

export const postsSlice = createSlice({
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
        state.hasError = false;
      })
      .addCase(getPostsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

// export const { setPosts, setLoader, setError } = postsSlice.actions;
export default postsSlice.reducer;
