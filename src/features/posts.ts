/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      initPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(initPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
