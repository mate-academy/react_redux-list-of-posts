import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';

type PostState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    startPostsLoading: state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    },

    setPosts: (_state, action: PayloadAction<Post[]>) => {
      return {
        loaded: true,
        hasError: false,
        items: action.payload,
      };
    },

    setPostsError: state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    },

    clearPosts: () => {
      return {
        loaded: false,
        hasError: false,
        items: [],
      };
    },
  },
});

export const { startPostsLoading, setPosts, setPostsError, clearPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
