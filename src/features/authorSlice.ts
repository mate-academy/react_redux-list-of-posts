/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const authorReducer = authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
