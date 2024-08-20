import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type Author = null | User;
const initialState: Author = null as Author;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(_state, action: PayloadAction<Author>) {
      return action.payload;
    },
  },
});

export const { reducer, actions } = authorSlice;
