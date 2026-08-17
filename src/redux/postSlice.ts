/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

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
    setLoading: state => {
      state.hasError = false;
      state.loaded = false;
    },

    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.hasError = false;
      state.loaded = true;
    },

    setError: state => {
      state.hasError = true;
      state.loaded = true;
    },
  },
});

export const { setPosts, setError, setLoading } = postsSlice.actions;
export default postsSlice.reducer;
