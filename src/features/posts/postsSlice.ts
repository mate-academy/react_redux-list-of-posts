/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  postsList: Post[],
  loading: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  postsList: [],
  loading: false,
  hasError: false,
};

export const getPostsByUserId = createAsyncThunk(
  'posts/fetch', (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'postsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsByUserId.pending, (state) => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(getPostsByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.postsList = action.payload;
    });

    builder.addCase(getPostsByUserId.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
