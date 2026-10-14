/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
});

export const { setPosts, setError, setLoaded } = postsSlice.actions;
export default postsSlice.reducer;
