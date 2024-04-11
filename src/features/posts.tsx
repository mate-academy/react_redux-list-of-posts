/* eslint-disable */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type Posts = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialPosts: Posts = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    setPosts: (value, action: PayloadAction<Post[]>) => {
      value.items = action.payload;
    },
    setLoaded: (value, action: PayloadAction<boolean>) => {
      value.loaded = action.payload;
    },
    setError: (value, action: PayloadAction<boolean>) => {
      value.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { setPosts, setLoaded, setError } = postsSlice.actions;
