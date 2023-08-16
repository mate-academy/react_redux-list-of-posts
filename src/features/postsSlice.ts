/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  (selectedUserId: number) => {
    return getUserPosts(selectedUserId);
  },
);

export interface PostsState {
  items: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { setSelectedPost, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
