/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';
import type { RootState } from '../app/store';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Post[],
};

const initialPosts: InitialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    setItems: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
export const postsStates = (state: RootState) => state.posts;
