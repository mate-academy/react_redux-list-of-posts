/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { loaded: false, hasError: false, items: [] },
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setError: state => {
      state.hasError = true;
      state.loaded = true;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
  },
});

export const { setComments, setError, setLoaded } = commentsSlice.actions;
export default commentsSlice.reducer;
