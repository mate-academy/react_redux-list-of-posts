/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type PostState = {
  items: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: string;
};

const initialState: PostState = {
  items: [],
  selectedPost: null,
  loaded: false,
  hasError: '',
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.hasError = '';
      state.loaded = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadPosts.rejected, (state, action) => {
      state.hasError = action.error.message || '';
      state.loaded = false;
    });
  },
});
