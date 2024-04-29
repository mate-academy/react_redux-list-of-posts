/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      state.author = action.payload;
    },
    clear: state => {
      state.author = null;
    },
  },
});

export default authorSlice.reducer;

export const { set, clear } = authorSlice.actions;
