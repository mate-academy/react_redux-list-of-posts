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
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.hasError = true;
      });
  },
});

export default userPostsSlice.reducer;
