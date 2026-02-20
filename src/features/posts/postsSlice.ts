/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

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
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const { setPosts, setLoaded, setHasError, clearPosts } =
  postsSlice.actions;
export default postsSlice.reducer;
