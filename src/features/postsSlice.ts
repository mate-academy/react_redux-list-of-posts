import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    clearPosts: (state) => {
      return {
        ...state,
        posts: [],
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
