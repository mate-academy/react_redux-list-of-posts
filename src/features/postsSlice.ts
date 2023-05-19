import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  items: Post[],
  isLoading: boolean,
  hasError: boolean,
  selectedPost: null | Post,
};

const initialState: PostState = {
  items: [],
  isLoading: false,
  hasError: false,
  selectedPost: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      const currentState = state;

      currentState.items = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      const currentState = state;

      currentState.isLoading = action.payload;
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
  setHasError,
  setIsLoading,
  setSelectedPost,
} = postSlice.actions;
export default postSlice.reducer;
