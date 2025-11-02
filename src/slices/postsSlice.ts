/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  errorMessage: null,
};

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(
        fetchPostsByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
          state.hasError = false;
          state.errorMessage = null;
        },
      )
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.loaded = true;
        state.hasError = true;
        state.errorMessage = action.error.message ?? null;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoaded = (state: RootState) => state.posts.loaded;
export const selectPostsHasError = (state: RootState) => state.posts.hasError;
export const selectPostsErrorMessage = (state: RootState) =>
  state.posts.errorMessage ?? null;

export default postsSlice.reducer;
