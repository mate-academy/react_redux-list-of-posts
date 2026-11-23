import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
  selectedPost: null as Post | null,
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
    setSelectedPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },
});

export const { setPosts, setLoaded, setError, setSelectedPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
