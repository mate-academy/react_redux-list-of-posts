import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[],
  loading: boolean,
  hasError: boolean,
};

const initialState: PostState = {
  posts: [],
  loading: false,
  hasError: false,
};

const init = createAsyncThunk('posts/fetch',
  (userId: number) => getUserPosts(userId));

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export const { reducer } = postsSlice;
export const actions = {
  init,
  ...postsSlice.actions,
};
