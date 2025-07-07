import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  value: Post[] | null;
  isLoading: boolean;
  error: null | string;
};

const initialState: State = {
  value: [],
  isLoading: false,
  error: null,
};

export const init = createAsyncThunk('posts/fetch', async (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    clearPosts: state => {
      return {
        ...state,
        value: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      };
    });
    builder.addCase(init.rejected, state => {
      return {
        ...state,
        error: 'Something went wrong',
        isLoading: false,
      };
    });
  },
});
