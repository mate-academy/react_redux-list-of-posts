import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

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

export const setPostsAsync = createAsyncThunk(
  'userPosts/fetchByUser',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(setPostsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(setPostsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(setPostsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoader = (state: RootState) => state.posts.loaded;
export const selectPostsHasError = (state: RootState) => state.posts.hasError;
export default postsSlice.reducer;
