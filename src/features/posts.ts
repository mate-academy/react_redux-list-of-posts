import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

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
    setLoaded(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export const { setError, setLoaded } = postsSlice.actions;
export default postsSlice.reducer;
