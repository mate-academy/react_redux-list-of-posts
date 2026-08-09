import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { Comment } from '../../types/Comment';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, actyon) => {
      state.items = actyon.payload;
    },

    setLoaded: (state, actyon) => {
      state.loaded = actyon.payload;
    },
    setHasError: (state, actyon) => {
      state.hasError = actyon.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { setComments, setLoaded, setHasError } = commentsSlice.actions;
