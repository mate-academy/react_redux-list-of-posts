import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  hasError: false,
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return {
        ...state,
        loaded: true,
        hasError: false,
        posts: action.payload,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        loaded: true,
        hasError: action.payload,
      };
    },
    setLoaded: (state, action) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    clearPosts: (state) => {
      return {
        ...state,
        loaded: false,
        hasError: false,
        posts: [],
      };
    },
  },
});

export const {
  setPosts,
  setError,
  clearPosts,
  setLoaded,
} = postsSlice.actions;

export default postsSlice.reducer;
