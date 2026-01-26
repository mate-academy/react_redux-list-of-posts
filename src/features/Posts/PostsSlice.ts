/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type PostState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
};

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: '',
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(loadPosts.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});
