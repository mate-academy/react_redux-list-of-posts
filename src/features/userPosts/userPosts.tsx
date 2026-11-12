import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadUserPosts } from './userPostsThunk';

type PostsState = {
  items: Post[];
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  requestId: null | string;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  loaded: false,
  hasError: false,
  requestId: null,
};

const userPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, (state, action) => {
        /* eslint-disable no-param-reassign */
        state.loading = true;
        state.loaded = false;
        state.hasError = false;
        state.requestId = action.meta.requestId;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.hasError = true;
        state.loading = false;
        state.loaded = false;
      });
  },
});

export default userPostsSlice.reducer;
