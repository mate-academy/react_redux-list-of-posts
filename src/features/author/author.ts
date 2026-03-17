/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as null | User;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    deleteAuthor: () => {
      return null;
    },
  },
});

export const { setAuthor, deleteAuthor } = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
