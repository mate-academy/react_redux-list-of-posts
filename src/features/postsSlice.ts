import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[];
  selectedPostId?: number;
  isLoaded: boolean;
  hasError: boolean;
  selectedPost: Post | null,
};

const initialState: PostsState = {
  items: [],
  selectedPostId: 0,
  isLoaded: false,
  hasError: false,
  selectedPost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      const currentState = state;

      currentState.items = action.payload;
    },
    setSelectedPostId(state, action: PayloadAction<number>) {
      const currentState = state;

      currentState.selectedPostId = action.payload;
    },
    setIsLoaded(state, action: PayloadAction<boolean>) {
      const currentState = state;

      currentState.isLoaded = action.payload;
    },
    setHasError(state, action: PayloadAction<boolean>) {
      const currentState = state;

      currentState.hasError = action.payload;
    },
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      const currentState = state;

      currentState.selectedPost = action.payload;
    },
  },
});

export const {
  setPosts,
  setSelectedPostId,
  setIsLoaded,
  setHasError,
  setSelectedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
