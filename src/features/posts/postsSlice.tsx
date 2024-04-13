import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoaded: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setHasError: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
    setPosts: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
  },
});

export const { setLoaded, setHasError, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
