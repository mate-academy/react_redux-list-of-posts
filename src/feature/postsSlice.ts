import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Post>) => {
      state.items.push(action.payload);
    },
    removePosts: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const {
  add, removePosts, setLoaded, setHasError,
} = postsSlice.actions;
