/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

import { Post } from '../../types/Post';

export interface Posts {
  items: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: Posts = {
  items: [],
  selectedPost: null,
  loaded: true,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/loadPosts',
  async (id: number) => {
    const posts = getUserPosts(id);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    addSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { addSelectedPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
