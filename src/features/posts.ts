/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostState {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsLoading(state) {
      state.loaded = false;
    },

    setPosts(state, action: PayloadAction<Post[]>) {
      state.loaded = true;
      state.hasError = false;
      state.posts = action.payload;
    },

    setPostsError(state) {
      state.loaded = true;
      state.hasError = true;
    },
  },
});

export const {
  setPostsLoading,
  setPosts,
  setPostsError,
} = postsSlice.actions;

export default postsSlice.reducer;
