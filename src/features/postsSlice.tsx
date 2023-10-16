import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  loaded: true,
  hasError: false,
  posts: [] as Post[],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action) => {
      return { ...state, loaded: action.payload };
    },
    setHasError: (state, action) => {
      return { ...state, hasError: action.payload };
    },
    setPosts: (state, action) => {
      return { ...state, posts: action.payload };
    },
  },
});

export const { setLoaded, setHasError, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
