/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  loading: boolean,
  error: boolean,
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
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
      state.loading = true;
      state.error = false;
    })

    .addCase(
      getPostsByUserId.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      },
    )

    .addCase(getPostsByUserId.rejected, (state) => {
      state.error = true;
      state.loading = false;
    }),
});

export default postsSlice.reducer;
