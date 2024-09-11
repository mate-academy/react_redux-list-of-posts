import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostSlice = {
  posts: Post[];
  loaded: boolean;
  error: boolean;
};

const initialState: PostSlice = {
  posts: [],
  loaded: false,
  error: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const postReducer = postSlice.reducer;
export const { setPost, setLoaded, setError } = postSlice.actions;
