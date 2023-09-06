/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export type PostsState = {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
};

const initState: PostsState = {
  posts: [],
  status: 'idle',
};

export const getPostsAsync = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = 'idle';
    });
    builder.addCase(getPostsAsync.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(getPostsAsync.pending, (state) => {
      state.status = 'loading';
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
