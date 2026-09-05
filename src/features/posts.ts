import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

interface PostsState {
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
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },

    setPostsLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setPostsError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    resetPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const { setPosts, setPostsLoaded, setPostsError, resetPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
