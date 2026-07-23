/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsStart: state => {
      state.loaded = false;
      state.hasError = false;
    },
    setPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setPostsError: state => {
      state.loaded = true;
      state.hasError = true;
    },
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const { setPostsStart, setPostsSuccess, setPostsError, clearPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
