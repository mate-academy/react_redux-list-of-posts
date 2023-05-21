/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsSlice = {
  items: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: PostsSlice = {
  items: [],
  loading: false,
  hasError: false,
};

export const initUserPosts = createAsyncThunk(
  'fetch/posts',
  (userId : number) => (
    getUserPosts(userId)
  ),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initUserPosts.pending, (state) => {
      state.loading = true;
    }).addCase(initUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    }).addCase(initUserPosts.rejected, (state) => {
      state.hasError = true;
      state.loading = false;
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
