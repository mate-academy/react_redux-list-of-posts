import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
    set: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
  },
});

export const actions = postsSlice.actions;
export default postsSlice.reducer;
