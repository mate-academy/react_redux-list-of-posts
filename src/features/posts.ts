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

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsLoading: state => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
    setPostsSuccess: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      loaded: true,
      hasError: false,
      items: action.payload,
    }),
    setPostsError: state => ({
      ...state,
      loaded: true,
      hasError: true,
      items: [],
    }),
    resetPosts: () => initialState,
  },
});

export const {
  setPostsLoading,
  setPostsSuccess,
  setPostsError,
  resetPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
