import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  items: Post [],
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    loadPosts: (state, { payload: posts }) => ({
      items: posts,
      loaded: state.loaded,
      hasError: state.hasError,
    }),
    setLoaded: (state, { payload: loaded }) => ({
      items: state.items,
      loaded,
      hasError: state.hasError,
    }),
    setError: (state, { payload: hasError }) => ({
      items: state.items,
      loaded: state.loaded,
      hasError,
    }),
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
