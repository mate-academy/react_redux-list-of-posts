import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState = null as AuthorState;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    select: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { select } = authorSlice.actions;
