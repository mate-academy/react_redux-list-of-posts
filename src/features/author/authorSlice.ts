/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action) {
      state.author = action.payload;
    },
    removeAuthor(state) {
      state.author = null;
    },
  },
});

export const authorReducer = authorSlice.reducer;
export const authorActions = authorSlice.actions;
