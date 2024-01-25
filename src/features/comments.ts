import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type State = {
  items: Comment [],
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    loadComments: (state, { payload: comments }) => ({
      items: comments,
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

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
