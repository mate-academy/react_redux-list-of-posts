/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: false,
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      if (state.selectedPost?.id === action.payload?.id) {
        state.selectedPost = null;
      } else {
        state.selectedPost = action.payload;
      }
    },
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { selectPost, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
