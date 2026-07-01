import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

interface PostsState {
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
    setPosts: (state: PostsState, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }),
    setSelectedPost: (
      state: PostsState,
      action: PayloadAction<Post | null>,
    ) => ({
      ...state,
      selectedPost: action.payload,
    }),
    setPostsError: (state: PostsState) => ({
      ...state,
      hasError: true,
      loaded: true,
    }),
  },
});

export const { setPosts, setSelectedPost, setPostsError } = postsSlice.actions;
export default postsSlice.reducer;
