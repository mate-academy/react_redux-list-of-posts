import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadUserPosts } from './userPostsThunk';

type PostsState = {
  items: Post[];
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  loaded: false,
  hasError: false,
};

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        /* eslint-disable no-param-reassign */
        state.loading = true;
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
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
