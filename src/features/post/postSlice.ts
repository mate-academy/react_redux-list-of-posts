import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = {
  posts: [] as Post[] | [],
  loader: false as boolean,
  error: '' as string,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loader: action.payload,
    }),
    setIsError: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const { actions } = postsSlice;
