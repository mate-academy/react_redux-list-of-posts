import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  items: Post[];
  loading: boolean;
  hasError: boolean;
  selectedPost?: Post;
};

const initialState: PostState = {
  items: [],
  loading: false,
  hasError: false,
  selectedPost: undefined,
};

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, items: action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setError: (state, action) => {
      return { ...state, hasError: action.payload };
    },
    setSelectedPost: (state, action: PayloadAction<Post | undefined>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export default postsSlice.reducer;
export const {
  setPosts,
  setLoading,
  setError,
  setSelectedPost,
} = postsSlice.actions;
