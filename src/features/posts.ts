/* eslint-disable no-console */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface Posts {
  items: Post[],
  loaded: boolean,
  hasError: boolean
}

const initialState: Posts = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (
      state: Posts,
      action: PayloadAction<Post[]>,
    ) => ({
      ...state,
      items: [...action.payload],
    }),

    setError: (
      state: Posts,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      hasError: action.payload,
    }),

    setLoaded: (
      state: Posts,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      loaded: action.payload,
    }),
  },
});

export const { setItems, setLoaded, setError } = postsSlice.actions;
