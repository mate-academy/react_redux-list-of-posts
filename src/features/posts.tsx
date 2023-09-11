/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  isError: boolean;
};

export const init = createAsyncThunk('posts/fetchPosts', async (id: number) => {
  const value = await getUserPosts(id);

  return value;
});

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  isError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.loading = false;
      state.isError = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { setSelectedPost, clearPosts, clearSelectedPost }
  = postsSlice.actions;
export default postsSlice.reducer;
