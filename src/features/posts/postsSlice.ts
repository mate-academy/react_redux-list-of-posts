/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadUserPosts } from '../../thunks/postsThunk';
import { Post } from '../../types/Post';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  isError: boolean;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  isError: false,
  loaded: true,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserPosts.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadUserPosts.rejected, (state) => {
      state.loaded = true;
      state.isError = true;
      state.posts = [];
    });
  },
});

export const { setSelectedPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
