/* eslint no-param-reassign: ["error", { "props": false }] */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  error: boolean
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { set, setError, setLoaded } = postsSlice.actions;
