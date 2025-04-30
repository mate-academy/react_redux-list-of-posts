import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return { ...state, loaded: action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, hasError: action.payload };
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, items: action.payload };
    },
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
