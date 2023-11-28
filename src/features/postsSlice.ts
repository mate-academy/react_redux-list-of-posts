/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  async (userId: number): Promise<Post[]> => {
    const posts: Post[] = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    select: (state, action) => {
      state.selectedPost = action.payload;
    },
    clear: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
export const { select, clear } = postsSlice.actions;
