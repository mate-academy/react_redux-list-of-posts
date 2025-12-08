/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
  selectedPost: Post | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
  selectedPost: null,
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload }: PayloadAction<[]>) {
      state.posts = payload;
    },
    selectedPost(state, { payload }: PayloadAction<Post | null>) {
      state.selectedPost = payload;
    },
    reset: state => {
      state.error = '';
      state.loading = false;
      state.selectedPost = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;

      state.loading = false;
    });
    builder.addCase(init.rejected, state => {
      state.loading = false;

      state.error = 'Error';
    });
  },
});

export const { actions } = postsSlice;
