/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: true,
  error: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    remove: state => {
      state.posts = [];
    },
  },

  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loading = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default PostsSlice.reducer;
export const { remove } = PostsSlice.actions;
