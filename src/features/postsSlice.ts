import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const fetchPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });
    builder.addCase(fetchPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
