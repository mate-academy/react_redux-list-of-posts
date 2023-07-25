/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/SET',
  async (userId: number) => {
    const loadedposts = await getUserPosts(userId);

    return loadedposts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    clearPosts(state) {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = 'failed';
        state.hasError = true;
      });
  },
});

export const { clearPosts, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
