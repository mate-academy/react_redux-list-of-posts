/* eslint-disable-next-line no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const authorReducer = authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
