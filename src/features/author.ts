import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState,
  reducers: {
    selectAuthor: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    unselectAuthor: () => {
      return null;
    },
  },
});

export const { selectAuthor, unselectAuthor } = authorSlice.actions;
