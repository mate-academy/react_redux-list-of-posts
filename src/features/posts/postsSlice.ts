/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import type { PayloadAction } from '@reduxjs/toolkit';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const fetchPostsByUserId = createAsyncThunk(
  'posts/fetchByUserId',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
      state.selectedPost = null;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUserId.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostsByUserId.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
export const { clearPosts, setSelectedPost } = postsSlice.actions;
