/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
  selectedPost: Post | null,
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => getUserPosts(userId),
);

const postsSlise = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    select: (state, action:PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clear: () => initialState,
  },
  extraReducers: bilder => {
    bilder
      .addCase(fetchPosts.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      });
  },
});

export default postsSlise.reducer;
export const { select, clear } = postsSlise.actions;
