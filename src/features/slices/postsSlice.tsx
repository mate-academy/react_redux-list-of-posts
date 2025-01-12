import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostType = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostType = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
  },
});

export const { setPosts, setLoaded, setError } = postsSlice.actions;
