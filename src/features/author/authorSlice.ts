/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type InitialState = {
  author: User | null;
};

const initialState: InitialState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    saveAuthor(state, action: PayloadAction<User>) {
      state.author = action.payload;
    },
  },
});

export const authorReducer = authorSlice.reducer;
export const { saveAuthor } = authorSlice.actions;
