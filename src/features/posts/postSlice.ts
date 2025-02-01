/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostUseState {
  selectedPost: Post | null;
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostUseState = {
  selectedPost: null,
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, state => {
      state.posts = [];
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.error = 'Something went wrong';
      state.isLoading = false;
    });

    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;

        state.posts = action.payload;
      },
    );
  },
});

export const { setPosts, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
