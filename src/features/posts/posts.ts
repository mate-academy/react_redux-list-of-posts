import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = {
  posts: [] as Post[],
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
    setHasError: (state, action: PayloadAction<boolean>) => {
      return { ...state, hasError: action.payload };
    },
  },
});

export const postsActions = postsSlice.actions;
