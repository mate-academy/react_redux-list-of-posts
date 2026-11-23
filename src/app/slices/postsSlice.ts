import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
    setLoaded: (state, action) => ({
      ...state,
      loaded: action.payload,
    }),

    setError: (state, action) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export const { setPosts, setLoaded, setError } =
  postsSlice.actions;
export const postsReducer = postsSlice.reducer;
