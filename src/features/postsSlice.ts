/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export default PostsSlice.reducer;
export const { actions } = PostsSlice;
