import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: { items: Post[]; loaded: boolean; hasError: boolean } = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return { ...state, items: action.payload };
    },
    setLoaded: (state, action) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action) => {
      return { ...state, hasError: action.payload };
    },
  },
});

export const { setPosts, setLoaded, setError } = postsSlice.actions;

export default postsSlice.reducer;
