import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
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
    setPosts(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
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

export const { setError, setLoaded, setPosts } = postsSlice.actions;
export default postsSlice.reducer;
