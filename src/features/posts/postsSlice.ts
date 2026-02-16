import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    startLoading: state => ({
      ...state,
      loaded: false,
      hasError: false,
    }),
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    setError: state => ({
      ...state,
      loaded: true,
      hasError: true,
    }),
  },
});

export const { startLoading, setPosts, setError } = PostsSlice.actions;
