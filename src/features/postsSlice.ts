import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type UserPosts = {
  posts: Post[];
  loading: boolean;
  error: boolean;
};

const userPosts: UserPosts = {
  posts: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('userPosts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: userPosts,
  reducers: {
    clear: state => {
      return {
        ...state,
        posts: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return {
        ...state,
        error: false,
        loading: true,
      };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    });

    builder.addCase(init.rejected, state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    });
  },
});

export const { clear } = postsSlice.actions;
