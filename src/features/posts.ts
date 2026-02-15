import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Post[],
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, { payload }) {
      state.items.push(payload);
    },
    removePost(state, { payload }) {
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload.id),
      };
    },
    clearPosts() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadPosts.fulfilled, (state, { payload }) => {
      return { ...state, loaded: true, items: payload };
    });
    builder.addCase(loadPosts.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
