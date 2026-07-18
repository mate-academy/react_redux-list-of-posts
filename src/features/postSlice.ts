import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

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
    startLoading: state => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    setPostsError: state => ({
      ...state,
      items: [],
      loaded: true,
      hasError: true,
    }),
    clearPosts: () => initialState,
  },
});

export default postsSlice.reducer;
export const { setPosts, clearPosts, setPostsError, startLoading } =
  postsSlice.actions;
