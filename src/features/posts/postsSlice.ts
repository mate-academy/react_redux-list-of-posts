/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

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

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async userId => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = true;
        state.hasError = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
