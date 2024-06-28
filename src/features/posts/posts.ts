/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  items: Post[] | [];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear(state) {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(loadPosts.rejected, state => {
      state.loaded = false;
      state.hasError = 'error with posts';
    });
  },
});

export default postsSlice.reducer;
export const actions = postsSlice.actions;
