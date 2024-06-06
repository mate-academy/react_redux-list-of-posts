import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
    getLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    getPosts: (state, action: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    },
  },
});

export default postsSlice.reducer;

export const { getPosts, getLoaded, getError } = postsSlice.actions;
