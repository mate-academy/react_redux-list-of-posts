import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
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
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    setPostsError: state => ({
      ...state,
      hasError: true,
      loaded: true,
    }),
    setSelectedPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },
});

export const { setPosts, setPostsError, setSelectedPost, setPostsLoading } =
  postsSlice.actions;
export default postsSlice.reducer;
