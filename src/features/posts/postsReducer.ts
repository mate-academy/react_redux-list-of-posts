/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './postsThrunk';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setError(state) {
      state.hasError = true;
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setPosts, setError } = postsSlice.actions;
export default postsSlice.reducer;
