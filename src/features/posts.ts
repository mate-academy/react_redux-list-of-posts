/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    set: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
