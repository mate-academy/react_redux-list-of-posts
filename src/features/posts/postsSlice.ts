import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

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

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsLoading: (state) => {
      state.loaded = false;
      state.hasError = false;
    },
    setPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loaded = true;
      state.hasError = false;
      state.items = action.payload;
    },
    setPostsError: (state) => {
      state.loaded = true;
      state.hasError = true;
      state.items = [];
    },
    clearPosts: (state) => {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    },
  },
});

export const { setPostsLoading, setPostsSuccess, setPostsError, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
export type { PostsState };
