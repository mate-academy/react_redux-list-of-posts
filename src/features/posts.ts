/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsType = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsType = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (posts, { payload }: PayloadAction<Post[]>) => {
      posts.items = [...payload];
    },
    setLoaded: (posts, { payload }: PayloadAction<boolean>) => {
      posts.loaded = payload;
    },
    setError: (posts, { payload }: PayloadAction<boolean>) => {
      posts.hasError = payload;
    },
  },
});

export default postsSlice.reducer;
export const { setPosts, setError, setLoaded } = postsSlice.actions;
