/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  err: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  err: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return {
          ...state,
          loading: true,
          posts: action.payload,
        };
      },
    );
    builder.addCase(fetchPosts.rejected, state => {
      return {
        ...state,
        err: true,
        loading: true,
      };
    });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
