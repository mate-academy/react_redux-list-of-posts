/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const getPostsByUserId = createAsyncThunk(
  'posts/fetch',
  (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getPostsByUserId.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })

    .addCase(
      getPostsByUserId.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.isLoading = false;
      },
    )

    .addCase(getPostsByUserId.rejected, (state) => {
      state.hasError = true;
      state.isLoading = false;
    }),
});

export default postsSlice.reducer;
