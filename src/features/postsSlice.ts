import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }),
    setLoaded: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loaded: action.payload,
    }),
    setHasError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      hasError: action.payload,
    }),
  },
});

export const { setPosts, setLoaded, setHasError } = postsSlice.actions;
export default postsSlice.reducer;
