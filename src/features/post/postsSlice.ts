/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { PostState } from '../../types/PostState';

const initialState: PostState = {
  posts: [] as Post[],
  loaded: true,
  hasError: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.loaded = false;
      state.hasError = '';
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loaded = true;
      state.posts = action.payload;
    },
    fetchPostsFailed(state, action: PayloadAction<string>) {
      state.loaded = true;
      state.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailed } =
  postsSlice.actions;
