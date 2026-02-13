/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.items.push(action.payload);
    },
    removePost(state, action) {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    },
    clearPost() {
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

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });

    builder.addCase(loadPosts.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export const { addPost, removePost, clearPost } = postsSlice.actions;
export default postsSlice.reducer;
