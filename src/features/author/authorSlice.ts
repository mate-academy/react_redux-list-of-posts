import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    author: (state, { payload }: PayloadAction<User | null>) => payload,
  },
});

export const { author: setAuthor } = authorSlice.actions;
