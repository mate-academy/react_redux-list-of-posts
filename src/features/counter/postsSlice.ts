/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
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
    setPosts: (state, actions: PayloadAction<Post[]>) => {
      state.items = actions.payload;
      state.hasError = false;
    },
    setLoaded: (state, actions: PayloadAction<boolean>) => {
      state.loaded = actions.payload;
    },
    setError: (state, actions: PayloadAction<boolean>) => {
      state.hasError = actions.payload;
    },
  },
});

export default postsSlice.reducer;
