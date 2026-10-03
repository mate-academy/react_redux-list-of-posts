import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';

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

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    setPostsLoading: () => ({
      loaded: false,
      hasError: false,
      items: [],
    }),

    setPosts: (_state, action: PayloadAction<Post[]>) => ({
      loaded: true,
      hasError: false,
      items: action.payload,
    }),

    setPostsError: () => ({
      loaded: true,
      hasError: true,
      items: [],
    }),

    resetPosts: () => ({
      loaded: false,
      hasError: false,
      items: [],
    }),
  },
});

export const { setPostsLoading, setPosts, setPostsError, resetPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
