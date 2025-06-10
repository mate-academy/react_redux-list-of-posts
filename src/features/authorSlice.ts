/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: AuthorState, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const { actions } = authorSlice;
export const authorReducer = authorSlice.reducer;
