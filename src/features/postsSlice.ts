import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPostId: number | null;
  selectedAuthorId: number | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPostId: null,
  selectedAuthorId: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setPostsLoading: state => {
      state.loaded = false;
      state.hasError = false;
    },
    setPostsError: state => {
      state.loaded = true;
      state.hasError = true;
    },
    setAuthor: (state, action: PayloadAction<number>) => {
      state.selectedAuthorId = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<number>) => {
      state.selectedPostId = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPostId = null;
    },
  },
});

export const {
  setPosts,
  setPostsLoading,
  setPostsError,
  setAuthor,
  setSelectedPost,
  clearSelectedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
