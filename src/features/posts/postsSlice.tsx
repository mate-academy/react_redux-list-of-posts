import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

const initialState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', userId => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});
