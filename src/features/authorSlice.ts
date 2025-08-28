import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState: AuthorState = null;

export const authorSlice: Slice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction) => {
      return action.payload;
    },
    removeAuthor: () => {
      return null;
    },
  },
});

export const { setAuthor, removeAuthor } = authorSlice.actions;
