/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[],
  hasError: boolean,
  loaded: boolean,
}

const initialState: PostsState = {
  posts: [],
  hasError: false,
  loaded: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[] | []>) => {
      state.posts = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts, setLoaded, setHasError } = postsSlice.actions;

export default postsSlice.reducer;
