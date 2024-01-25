/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[],
  selectedPost: Post | null,
  loaded: boolean,
  error: string,
};

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loaded: true,
  error: '',
};

export const init = createAsyncThunk(
  'post/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.error = 'error';
    });
  },
});

export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
