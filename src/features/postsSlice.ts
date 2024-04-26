/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const pastsAsync = createAsyncThunk(
  'pasts/fetchUsers',
  async (userId: number) => {
    const pasts = await getUserPosts(userId);

    return pasts;
  },
);

export const postsAsync = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const posts = getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
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

// export const { set, setLoading, setError } = postsSlice.actions;

export default postsSlice.reducer;
