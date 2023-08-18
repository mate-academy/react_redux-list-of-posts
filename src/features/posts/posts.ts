/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const init = createAsyncThunk('posts/fetch', async (userId: number) => {
  return getUserPosts(userId);
});

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    discard: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = ((state.posts.length > 0));
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { set, discard } = postsSlice.actions;
export default postsSlice.reducer;
