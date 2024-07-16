/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export type PostsState = {
  posts: Post[] | [];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(init.rejected, state => {
        state.error = 'Error';
        state.loading = false;
      });
  },
});

export const postReducer = postsSlice.reducer;
export const { setPost } = postsSlice.actions;
