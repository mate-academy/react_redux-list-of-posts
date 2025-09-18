/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const loadPosts = createAsyncThunk<Post[], number>(
  'posts/loadPosts',

  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.push(action.payload);
    },
    removePost: (state, action: PayloadAction<Post>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.hasError = '';
        state.loaded = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || '';
      });
  },
});

export const { setPosts, addPost, removePost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
