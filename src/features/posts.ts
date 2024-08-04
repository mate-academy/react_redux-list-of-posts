import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  hasError: false,
  loaded: true,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: state => {
      // eslint-disable-next-line no-param-reassign
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(initPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
  },
});

export const { resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
