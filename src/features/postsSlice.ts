import { Post } from '../types/Post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: true,
  hasError: false,
  items: [] as Post[],
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return { ...state, loaded: false };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });
    builder.addCase(init.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});
