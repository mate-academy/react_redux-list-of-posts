/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './fetchPosts';

export interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: boolean;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clearPosts: state => {
      state.posts = [];
      state.selectedPost = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as boolean;
    });
  },
});

export const { setSelectedPost, clearPosts } = postSlice.actions;
export const { name: postSliceName } = postSlice;
export const { reducer: postsReducer } = postSlice;
