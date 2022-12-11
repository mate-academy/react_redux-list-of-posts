/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type Posts = {
  posts: Post[],
  loading: boolean,
  hasError: boolean,
  selectedPost: Post | null,
};

const initialState: Posts = {
  posts: [],
  loading: false,
  hasError: false,
  selectedPost: null,
};

export const initPosts = createAsyncThunk('getPosts/fetch',
  (userId: number) => getUserPosts(userId));

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loading
   = true;
      state.hasError = false;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.loading
   = false;
      state.posts = action.payload;
    });

    builder.addCase(initPosts.rejected, (state) => {
      state.hasError = true;
      state.loading
   = false;
    });
  },
});

export default postsSlice.reducer;
export const { setSelectedPost } = postsSlice.actions;
