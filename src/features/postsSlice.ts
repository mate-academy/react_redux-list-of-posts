/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
};

export const postsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const postsFromServer = await getUserPosts(userId);

    return postsFromServer;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts: (state: PostsState) => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(postsAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { removePosts } = postsSlice.actions;
export default postsSlice.reducer;
