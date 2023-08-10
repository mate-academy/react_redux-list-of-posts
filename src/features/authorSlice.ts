/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action) => {
      state.author = action.payload;
    },

    clear: (state) => {
      state.author = null;
    },
  },
});

export const { set, clear } = authorSlice.actions;

export default authorSlice.reducer;
