import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadPosts } from './postsThunk';

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.fulfilled, (state, action) => {
        /* eslint-disable no-param-reassign */
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, state => {
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
