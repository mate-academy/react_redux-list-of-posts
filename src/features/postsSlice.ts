import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: string | '';
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Post[]>) => {
      state.posts = payload;
    },
    setLoaded(state, { payload }: PayloadAction<boolean>) {
      state.loaded = payload;
    },
    setError(state) {
      state.hasError = 'Something went wrong!';
    },
  },
});

export const { reducer, actions } = postsSlice;
