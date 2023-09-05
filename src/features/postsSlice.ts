/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null,
  loading: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.loading = false;
      state.hasError = false;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.hasError = false;
        state.posts = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const {
  setSelectedPost,
  clearPosts,
  clearSelectedPost,
} = postsSlice.actions;
export default postsSlice.reducer;
