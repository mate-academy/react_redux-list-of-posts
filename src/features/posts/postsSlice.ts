import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loaded: false,
    hasError: false,
    items: [] as Post[],
  },
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
    setLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    setError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export const { setPosts, setLoaded, setError } = postsSlice.actions;
