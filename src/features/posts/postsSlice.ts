/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getPostsByAuthorId = createAsyncThunk(
  'posts/fetchPosts',
  async (authorId: number) => getUserPosts(authorId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsByAuthorId.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getPostsByAuthorId.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getPostsByAuthorId.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
