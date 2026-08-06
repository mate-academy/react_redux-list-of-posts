import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    startLoadingPosts: () => ({
      loaded: false,
      hasError: false,
      items: [],
    }),

    setPosts: (_state, action: PayloadAction<Post[]>) => ({
      loaded: true,
      hasError: false,
      items: action.payload,
    }),

    setPostsError: state => ({
      ...state,
      loaded: true,
      hasError: true,
    }),

    clearPosts: () => initialState,
  },
});

export const { startLoadingPosts, setPosts, setPostsError, clearPosts } =
  postsSlice.actions;
